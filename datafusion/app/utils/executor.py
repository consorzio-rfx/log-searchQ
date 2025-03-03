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
    
    def to_json(self):
        return {"executorName": self.executorName, "executorInput": self.executorInput}

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
            executorOutput = ExecutionCache.getCachedOutput(self.executorName, args)
            # Cache
            ExecutionCache.cache(self.executorName, self.executorInput, executorOutput)
            return executorOutput
        
        # Actually compute
        executorOutput =  self.compute(*args)

        # Cache
        ExecutionCache.cache(self.executorName, self.executorInput, executorOutput) 
        ExecutionCache.cache(self.executorName, args, executorOutput)

        return executorOutput

    # Computation Logic is implemented in this function
    @abstractmethod
    def compute(self, *args):
        pass

class ComputeMaxCurrentOfShotExecutor(Executor):
    def compute(self, *args):
        shot = args[0]["shot"]
        path = args[1]["path"]

        nodeData = MDSplusAdapter.getNodeData('RFX', shot, path)

        return {"result": np.max(nodeData).item()}


class ComputeMaxCurrentOfShotsExecutor2(Executor):
    def compute(self, *args):
        results = [arg["result"] for arg in args]
        return {"result": max(results)}

class ComputeMaxCurrentOfShotsExecutor(Executor):
    # Special case
    def transfrom(self, *args):
        shots = args[0]["shots"]
        path = args[1]["path"]

        transformedInput = []
        for shot in shots:
            perShotInput = {"executorName": "ComputeMaxCurrentOfShotExecutor", "executorInput": [{"shot": shot}, {"path": path}]}
            transformedInput.append(perShotInput)

        return ComputeMaxCurrentOfShotsExecutor2("ComputeMaxCurrentOfShotsExecutor2", transformedInput)

    def compute(self, *args):
        return self.transfrom(*args).execute()

class GetShotsOfRunExecutor(Executor):
    def compute(self, *args):
        run = args[0]["run"]

        shots = LogbookAdapter.getShotsOfRun(run)

        return {"shots": shots}  

ExecutorRegistry = {
    "ComputeMaxCurrentOfShotExecutor": ComputeMaxCurrentOfShotExecutor,
    "ComputeMaxCurrentOfShotsExecutor": ComputeMaxCurrentOfShotsExecutor,
    "ComputeMaxCurrentOfShotsExecutor2": ComputeMaxCurrentOfShotsExecutor2,
    "GetShotsOfRunExecutor": GetShotsOfRunExecutor
}