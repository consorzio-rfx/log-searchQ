from app import create_app
from app.services.query_service import QueryService
from app.utils.query_executor import QueryInput, QueryInputBuilder, QueryExecutor
from pyspark.sql import SparkSession

if __name__ == '__main__':
    app = create_app()
    # Initialize SparkSession
    # spark = SparkSession.builder.appName("HelloWorld").master("local[*]").getOrCreate()

    executionUnitFunction1 = r"""
def testFunc1(shot: int) -> dict:
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

    executionUnitFunction2 = r"""
def testFunc2(shot: int) -> dict:
    result = {}
    result["it_data"] = shot
    result["it_time"] = shot
    return result
"""

    with app.app_context():
        # QueryService.createQuery("testQuery1", "testQueryDescription1", executionUnitFunction1)
        # QueryService.createQuery("testQuery2", "testQueryDescription2", executionUnitFunction2)

        query = QueryService.getQuery("testQuery2")
        queryExecutor = QueryExecutor(query)
        queryInput = QueryInput(shotList=[39390, 39391])
        print(queryExecutor.execute(queryInput=queryInput))