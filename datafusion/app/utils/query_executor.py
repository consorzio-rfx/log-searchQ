from pyspark.sql import SparkSession
from pyspark.context import SparkContext
from ..services.query_service import QueryService
from ..models.query_model import Query
from .execution_unit_cache import ExecutionUnitCache

class QueryInput:
    def __init__(self, sqlForm: str = None, shotList: list = None):
        self.sqlForm = sqlForm 
        self.shotList = shotList

    def getShotList(self):
        if self.shotList is None:
            # execute sql
            pass

        return self.shotList
    
    def getSqlFrom(self):
        return self.sqlForm

class QueryInputBuilder:
    # Mapping to a sort of SQL query
    def __init__(self):
        self.run = None
        self.pre_brief = None
        self.post_brief = None
        self.pre_keywords = None
        self.post_keywords = None
        self.quality = None

    def run_equal_to(self, run: int):
        self.run = run
        return self

    def pre_brief_contain(self, pre_brief: str):
        self.pre_brief = pre_brief
        return self

    def build(self) -> QueryInput:
        sqlFrom = "SELECT shot from shots WHERE TRUE"
        if self.run is not None:
            sqlFrom += " AND run={}".format(self.run)
        if self.pre_brief is not None:
            sqlFrom += " AND pre_brief SIMILAR TO '%({})%'".format(self.pre_brief)
        
        return QueryInput(sqlForm=sqlFrom)
        
class QueryExecutor:
    @staticmethod
    def execute(sparkContext: SparkContext = None, query: Query = None, queryInput: QueryInput = None) -> dict:
        shotList = queryInput.getShotList()
        shotsRDD = sparkContext.parallelize(shotList, numSlices=2)
        resultsRDD = shotsRDD.map(lambda shot: (shot, UnitFunctionExecutor.executePerShotWithCache(query, shot, True)))
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

