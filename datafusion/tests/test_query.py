from app.utils.query import *
import inspect
from pyspark.sql import SparkSession

def testFunc(shot: int) -> dict:
    result = {}
    result["it_data"] = shot
    result["it_time"] = shot
    return result

def testFunc(shot: int) -> dict:
    value = shot * shot
    
    result = {}
    result["it_data"] = value
    result["it_time"] = value

    return result
if __name__ == '__main__':
    # Initialize SparkSession
    spark = SparkSession.builder.appName("HelloWorld").master("local[*]").getOrCreate()

    executionUnit = r"""
def testFunc(shot: int) -> dict:
    import MDSplus as mds

    tree = mds.Tree('RFX', shot)
    node = tree.getNode('\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT')
    it_data = node.data()
    it_time = node.dim_of().data()

    result = {}
    result["it_data"] = it_data
    result["it_time"] = it_time

    tree.close()

    return result
"""
    # executionUnit = inspect.getsource(testFunc)

    queryInput = QueryInput(shotList=[39390, 39391])
    query = Query("testQuery", executionUnit, "testQuery description")
    print(query.execute(spark=spark, queryInput=queryInput))


    # q = QueryRegistry.getQueryByName("testQuery")
    # q.execute(queryInput)

    # query = QueryInputBuilder().run_equal_to(2).pre_brief_contain("test").build()
    # print(query.getSqlFrom())

    # query.getShotList()