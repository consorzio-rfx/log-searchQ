from pyspark.sql import SparkSession
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
    def __init__(self, query: Query):
        self.query = query

    def execute(self, spark: SparkSession = None, queryInput: QueryInput = None) -> dict:
        results = dict(map(lambda shot: (shot, self.executeUnitFunction(shot)), queryInput.getShotList()))
        
        # SPARK 
        # shotsRDD = spark.sparkContext.parallelize(queryInput.getShotList())
        # resultsRDD = shotsRDD.map(lambda shot: (shot, UnitFunctionExecutor.executeRemotely(self.query.executionUnitFunction, shot)))
        # results = resultsRDD.collectAsMap()

        return results
    
    def executeUnitFunction(self, shot):
        print("executeUnitFunction", self.query.queryName, shot)
        result = None
        if ExecutionUnitCache.hasCached(self.query.queryName, shot):
            result = ExecutionUnitCache.getCachedResult(self.query.queryName, shot) 
        else:
            result = UnitFunctionExecutor.execute(self.query.executionUnitFunction, shot) 

        ExecutionUnitCache.cache(self.query.queryName, shot, result)
        return result

class UnitFunctionExecutor: 
    @staticmethod
    def execute(executionUnitFunction: str, shot: int):
        import time
        import re
        
        time.sleep(5)

        executionName = re.search(r'\bdef (\w+)\s*\(', executionUnitFunction).group(1)
        localContext = {}
        exec(executionUnitFunction, {}, localContext)
        result = localContext[executionName](shot)
        return result

    @staticmethod
    # Mock with MDSplus operations
    def executeRemotely(executionUnitFunction: str, shot: int):
        import pickle
        import requests
        
        data = {"executionUnitFunction": executionUnitFunction, "shot": shot} 
        response = requests.post("http://localhost:5002/execute", json=data)
        result = pickle.loads(response.content)
        return result