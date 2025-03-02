from abc import ABC, abstractmethod
from .logbook_adapter import LogbookAdapter
from .mdsplus_adapter import MDSplusAdapter
from .execution_cache import ExecutionCache
import numpy as np

ExecutorRegistry = {}

class Executor:
    def __init__(self, executorName, executorInput):
        self.executorName = executorName
        self.executorInput = executorInput

    def execute(self):
        # Check cache with initial form
        if ExecutionCache.hasCached(self.executorName, self.executorInput):
            return ExecutionCache.getCachedOutput(self.executorName, self.executorInput)

        # Recursively compute child 
        # Could be MapReduce
        args = []
        for arg in self.executorInput:
            if "executorName" in arg:
                executorName = arg["executorName"]
                executorInput = arg["executorInput"]
                args.append(ExecutorRegistry[executorName](executorName, executorInput).execute())
            else:
                args.append(arg)

        # Check cache with args form
        if (ExecutionCache.hasCached(self.executorName, args)):
            # Cache
            ExecutionCache.cache(self.executorName, self.executorInput, executorOutput)
            return ExecutionCache.getCachedOutput(executorName, args)
        
        # Actually compute
        executorOutput =  self.compute(*args)

        # Cache
        ExecutionCache.cache(self.executorName, self.executorInput, executorOutput) 
        ExecutionCache.cache(self.executorName, args, executorOutput)

        return executorOutput

    
    @abstractmethod
    def compute(self, *args):
        pass

class ComputeMaxCurrentOfShotExecutor(Executor):
    def compute(self, *args):
        shot = args[0]["shot"]
        path = args[1]["path"]

        nodeData = MDSplusAdapter.getNodeData('RFX', shot, path)

        return {"result": np.max(nodeData).item()}


class ComputeMaxCurrentOfShotsExecutor(Executor):
    def compute(self, *args):
        shots = args[0]["shots"]
        path = args[1]["path"]

        # Could be MapReduce
        results = []
        for shot in shots:
            perShotInput = [{"shot": shot}, {"path": path}]
            perShotExecutor = ComputeMaxCurrentOfShotExecutor("ComputeMaxCurrentOfShotExecutor", perShotInput)
            results.append(perShotExecutor.execute()["result"]) 

        return {"result": max(results)}

class GetShotsOfRunExecutor(Executor):
    def compute(self, *args):
        run = args[0]["run"]

        shots = LogbookAdapter.getShotsOfRun(run)

        return {"shots": shots}  

ExecutorRegistry = {
    "ComputeMaxCurrentOfShotExecutor": ComputeMaxCurrentOfShotExecutor,
    "ComputeMaxCurrentOfShotsExecutor": ComputeMaxCurrentOfShotsExecutor,
    "GetShotsOfRunExecutor": GetShotsOfRunExecutor
}