from pyspark.sql import SparkSession
from pyspark.context import SparkContext
from ..services.query_service import QueryService
from ..models.query_model import Query
from .execution_unit_cache import ExecutionUnitCache
from ..database.db import db
from sqlalchemy import text

class QueryInput:
    def __init__(self, sqlForm: str = None, shotList: list = None):
        self.sqlForm = sqlForm 
        self.shotList = shotList

    def getShotList(self):
        if (self.shotList is None) and (self.sqlForm):
            print(self.sqlForm)
            sql = text(self.sqlForm)
            result = db.session.execute(sql).mappings().all()
            self.shotList = [row["shot"] for row in result]

        return self.shotList
    
    def getShotDetails(self):
        shotList = self.getShotList()
        if (shotList is None) or (len(shotList) == 0):
            return []
        
        sql = text("SELECT * FROM shots WHERE shot IN ({})".format(", ".join(map(str, shotList))))
        result = db.session.execute(sql).mappings().all()
        return result
    
    def _getSqlFrom(self):
        return self.sqlForm

class QueryInputBuilder:
    def __init__(self, shotList = [], run = -1, pre_brief = '', post_brief = '', pre_keywords = '', post_keywords = ''):
        self.shotList = shotList 
        
        self.run = run
        self.pre_brief = pre_brief
        self.post_brief = post_brief
        self.pre_keywords = pre_keywords
        self.post_keywords = post_keywords

    def build(self) -> QueryInput:
        sqlForm1 = None
        if len(self.shotList) > 0:
            sqlForm1 = "SELECT shot from shots WHERE shot IN ({})".format(", ".join(map(str, self.shotList)))
        
        sqlForm2 = None
        if self.run != -1 or self.pre_brief or self.post_brief or self.pre_keywords or self.post_keywords:
            sqlForm2 = "SELECT shot from shots WHERE TRUE"
            if self.run != -1:
                sqlForm2 += " AND run={}".format(self.run)
            if self.pre_brief:
                sqlForm2 += " AND pre_brief SIMILAR TO '%({})%'".format(self.pre_brief)
            if self.post_brief:
                sqlForm2 += " AND post_brief SIMILAR TO '%({})%'".format(self.post_brief)
            if self.pre_keywords:
                sqlForm2 += " AND post_keywords SIMILAR TO '%({})%'".format(self.pre_keywords)
            if self.post_keywords:
                sqlForm2 += " AND post_keywords SIMILAR TO '%({})%'".format(self.post_keywords)

        sqlForm = None
        if sqlForm1 and sqlForm2:
            sqlForm = sqlForm1 + " UNION " + sqlForm2
        elif sqlForm1:
            sqlForm = sqlForm1
        else:
            sqlForm = sqlForm2
        
        return QueryInput(sqlForm=sqlForm)
        
class QueryExecutor:
    @staticmethod
    def execute(sparkContext: SparkContext = None, query: Query = None, queryInput: QueryInput = None, cache: bool = True) -> dict:
        shotList = queryInput.getShotList()
        if (shotList is None) or (len(shotList) == 0):
            return {}
            
        if sparkContext is None:
            results = None
            return results 

        # Spark
        shotsRDD = sparkContext.parallelize(shotList, numSlices=2)
        resultsRDD = shotsRDD.map(lambda shot: (shot, UnitFunctionExecutor.executePerShotWithCache(query, shot, cache)))
        results = resultsRDD.collectAsMap()

        return results 
    
class UnitFunctionExecutor:
    @staticmethod
    def executePerShotWithCache(query: Query, shot: int, cache = False):
        from app import create_app
        from app.config import ConfigSpark

        app = create_app(None, ConfigSpark)
        
        result = None
        with app.app_context():
            if cache and ExecutionUnitCache.hasCached(query.queryName, shot):
                print("CACHE HITTTTTTTTT")
                result = ExecutionUnitCache.getCachedResult(query.queryName, shot)
            else:
                result = UnitFunctionExecutor.executePerShot(query, shot)

            if cache:
                ExecutionUnitCache.cache(query.queryName, shot, result)

        return result


    @staticmethod
    def executePerShot(query: Query, shot: int):
        import time
        import re

        print(query.executionUnitFunction, shot)
        # Mock
        time.sleep(10)

        executionName = re.search(r'\bdef (\w+)\s*\(', query.executionUnitFunction).group(1)
        localContext = {}
        exec(query.executionUnitFunction, {}, localContext)
        result = localContext[executionName](shot)
        return result

    @staticmethod
    # Mock with MDSplus operations
    def executePerShotRemotely(query: Query, shot: int):
        import pickle
        import requests

        print(query.executionUnitFunction, shot)
        
        data = {"executionUnitFunction": query.executionUnitFunction, "shot": shot} 
        response = requests.post("http://localhost:5002/execute", json=data)
        result = pickle.loads(response.content)
        return result

