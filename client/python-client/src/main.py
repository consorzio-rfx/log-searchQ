from logbook_client import LogbookClient
from query_client import QueryClient
import pandas as pd
import timeit
import math

if __name__ == "__main__":
    # logbookClient = LogbookClient()
    # data = logbookClient.getAllRunsAsDataFrame()
    # print(data.info())
    # print(data)

    executionUnitFunction = r"""
def maxCurrent(shot: int) -> dict:
    import MDSplus as mds
    import numpy as np

    tree = mds.Tree('RFX', shot)
    node = tree.getNode('\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT')
    it_data = node.data()
    max_it = np.max(it_data)

    result = {}
    result["max_it"] = max_it

    tree.close()

    return result
"""
    # response = QueryClient.createQuery("http://localhost:5001/queries", "computeMaxCurrent", [], "", executionUnitFunction)
    # print(response)

    start_ts = timeit.default_timer()
    result = QueryClient.execute("http://localhost:5001/api/executeQuery/execute", "computeMaxCurrent", [39390])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time = {} ms".format(math.ceil(elapsed_time * 1000)))

    start_ts = timeit.default_timer()
    result = QueryClient.execute("http://localhost:5001/api/executeQuery/execute", "computeMaxCurrent", [39390])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time = {} ms".format(math.ceil(elapsed_time * 1000)))

    start_ts = timeit.default_timer()
    result = QueryClient.execute("http://localhost:5001/api/executeQuery/execute", "computeMinCurrent", [39390])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time = {} ms".format(math.ceil(elapsed_time * 1000)))

    start_ts = timeit.default_timer()
    result = QueryClient.execute("http://localhost:5001/api/executeQuery/execute", "computeMaxAndMinCurrent", [39390])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time = {} ms".format(math.ceil(elapsed_time * 1000)))

