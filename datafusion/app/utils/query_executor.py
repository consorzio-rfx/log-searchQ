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
    @staticmethod
    def execute(spark: SparkSession = None, query: Query = None, queryInput: QueryInput = None) -> dict:
        shotList = queryInput.getShotList()
        cachedResults = {}
        nonCachedShotList = []

        # Get cached results
        for shot in shotList:
            if ExecutionUnitCache.hasCached(query.queryName, shot):
                cachedResults[shot] = ExecutionUnitCache.getCachedResult(query.queryName, shot)
            else:
                nonCachedShotList.append(shot)

        # Using Spark
        nonCachedShotsRDD = spark.sparkContext.parallelize(nonCachedShotList)
        nonCachedResultsRDD = nonCachedShotsRDD.map(lambda shot: (shot, UnitFunctionExecutor.executePerShot(query, shot)))
        nonCachedResults = nonCachedResultsRDD.collectAsMap()

        # Cache
        for nonCachedShot, nonCachedResult in nonCachedResults.items():
            ExecutionUnitCache.cache(query.queryName, nonCachedShot, nonCachedResult)

        return cachedResults | nonCachedResults 
    
class UnitFunctionExecutor:
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

