from ..services.execution_service import ExecutionService

class ExecutionCache:
    @staticmethod
    def hasCached(executorName, executorInput):
        cachedExecution = ExecutionService.getExecution(executorName, executorInput)
        if cachedExecution:
            return True 
        
        return False
    
    @staticmethod
    def getCachedOutput(executorName, executorInput):
        cachedExecution = ExecutionService.getExecution(executorName, executorInput)
        return cachedExecution.executorOutput
    
    @staticmethod
    def cache(executorName, executorInput, executorOutput):
        if (ExecutionCache.hasCached(executorName, executorInput)):
            return
        
        ExecutionService.createExecution(executorName, executorInput, executorOutput)