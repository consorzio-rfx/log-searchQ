from ..services.execution_unit_service import ExecutionUnitService
from typing import Any
import pickle

class ExecutionUnitCache:
    @staticmethod
    def hasCached(queryName: str, shot: int) -> bool:
        cachedExecutionUnit = ExecutionUnitService.getExecutionUnit(queryName, shot)
        if cachedExecutionUnit:
            return True
        
        return False

    @staticmethod
    def getCachedResult(queryName: str, shot: int) -> Any:
        return pickle.loads(ExecutionUnitService.getExecutionUnit(queryName, shot).result)


    @staticmethod
    def cache(queryName: str, shot: int, result: Any):
        if ExecutionUnitCache.hasCached(queryName, shot):
            return
        
        ExecutionUnitService.createExecutionUnit(queryName, shot, pickle.dumps(result))