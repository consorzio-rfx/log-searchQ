from query_client import QueryClient
import timeit
import math

def maxCurrent(shot: int) -> dict:
    import MDSplus as mds
    import numpy as np

    tree = mds.Tree('RFX', shot)
    node = tree.getNode('\\RFX::TOP.RFX.DIAG.A.RESULTS.EMRA:IT')
    it_data = node.data()
    max_it = np.max(it_data)

    result = {}
    result["max_it"] = max_it

    tree.close()
    return result

if __name__ == "__main__":
    SERVER = "http://localhost:5001"

    # Query Creation
    response = QueryClient.createQuery(server=SERVER, queryName="computeMaxCurrent", 
                                       dependencies=[], queryDescription="", 
                                       executionUnitFunction=maxCurrent)

    # Query Execution
    start_ts = timeit.default_timer()
    result = QueryClient.execute(SERVER, "computeMaxCurrent", [39384, 39385, 39386, 39387, 39388, 39389, 39390, 39391])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time = {} ms".format(math.ceil(elapsed_time * 1000)))

    # Query Dependency
    start_ts = timeit.default_timer()
    result = QueryClient.execute(SERVER, "computeMaxCurrent", [39384, 39385, 39386, 39387, 39388, 39389, 39390, 39391])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time of computeMaxCurrent  = {} ms".format(math.ceil(elapsed_time * 1000)))

    start_ts = timeit.default_timer()
    result = QueryClient.execute(SERVER, "computeMinCurrent", [39384, 39385, 39386, 39387, 39388, 39389, 39390, 39391])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time of computeMinCurrent = {} ms".format(math.ceil(elapsed_time * 1000)))

    start_ts = timeit.default_timer()
    result = QueryClient.execute(SERVER, "computeMaxAndMinCurrent", [39384, 39385, 39386, 39387, 39388, 39389, 39390, 39391])
    elapsed_time = timeit.default_timer() - start_ts
    print("Running time of computeMaxAndMinCurrent = {} ms".format(math.ceil(elapsed_time * 1000)))

