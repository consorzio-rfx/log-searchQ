from pyspark.sql import SparkSession

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
        
class Query:
    def __init__(self, queryName: str, executionUnit: str, queryDescription: str):
        self.queryName = queryName
        self.executionUnit = executionUnit
        self.queryDescription = queryDescription

    def execute(self, spark: SparkSession = None, queryInput: QueryInput = []) -> dict:
        # Could be map-reduce
        # results = dict(map(lambda shot: (shot, ExecutorWrapper.executeRemotely(self.executionUnit, shot)), queryInput.getShotList()))
        
        shotsRDD = spark.sparkContext.parallelize(queryInput.getShotList())
        resultsRDD = shotsRDD.map(lambda shot: (shot, ExecutorWrapper.executeRemotely(self.executionUnit, shot)))
        results = resultsRDD.collectAsMap()

        return results

 
class QueryRegistry:
    # Look up in database
    @staticmethod
    def getQueryByName(queryName: str) -> Query:
        pass


# Mock
class ExecutorWrapper:
    @staticmethod
    def execute(executionUnit: str, shot: int):
        import re

        # execute the executionUnit
        executionName = re.search(r'\bdef (\w+)\s*\(', executionUnit).group(1)
        localContext = {}
        exec(executionUnit, {}, localContext)
        result = localContext[executionName](shot)
        return result

    @staticmethod
    # Mock with MDSplus operations
    def executeRemotely(executionUnit: str, shot: int):
        import pickle
        import requests
        
        data = {"executionUnit": executionUnit, "shot": shot} 
        response = requests.post("http://localhost:5002/execute", json=data)
        result = pickle.loads(response.content)
        return result