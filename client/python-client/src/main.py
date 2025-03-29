from logbook_client import LogbookClient
from query_client import QueryClient
import pandas as pd

if __name__ == "__main__":
    # logbookClient = LogbookClient()
    # data = logbookClient.getAllRunsAsDataFrame()
    # print(data.info())
    # print(data)

    executionUnitFunction = r"""
def func(shot: int) -> dict:
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
    response = QueryClient.createQuery("http://localhost:5001/queries", "testQuery5", ["testQuery1", "testQuery2"], "##", executionUnitFunction)
    print(response)