from app import create_app
from app.services.query_service import QueryService
from app.utils.query_executor import QueryInput, QueryInputBuilder, QueryExecutor
from pyspark.sql import SparkSession
from app.config import Config

if __name__ == '__main__':
    # Initialize SparkSession
    # spark = SparkSession.builder.appName("test").master("spark://localhost:7077").getOrCreate()
    # sparkContext = spark.sparkContext
    # sparkContext.addPyFile("app.zip")
    app = create_app(None, Config)

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

    executionUnitFunction3 = r"""
def testFunc2(shot: int) -> dict:
    import numpy as np    

    result = {}
    result["it_data"] = shot * np.ones((2,)) 
    result["it_time"] = np.arange(0, 2, 1)
    return result
"""

    with app.app_context():
        # QueryService.createQuery("testQuery1", [], "testQueryDescription1", executionUnitFunction1)
        # QueryService.createQuery("testQuery2", ["testQuery1"], "testQueryDescription2", executionUnitFunction2)
        # QueryService.createQuery("testQuery3", ["testQuery1", "testQuery2"], "testQueryDescription3", executionUnitFunction3)

        dependencyQueries = QueryService.getDependencyQueries("testQuery3")
        print(dependencyQueries)

