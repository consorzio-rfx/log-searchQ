import requests
import pickle
import inspect
from functools import wraps

def QueryDecorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    
    setattr(wrapper, "_isExecutionUnitFunction", True)
    return wrapper

class QueryClient:
    @staticmethod
    def createQuery(server: str, queryName: str, dependencies: list, queryDescription: str, executionUnitFunction):
        if getattr(executionUnitFunction, "_isExecutionUnitFunction", False):
            data = {
                "queryName": queryName,
                "dependencies": ", ".join(dependencies),
                "queryDescription": queryDescription,
                "executionUnitFunction": inspect.getsource(executionUnitFunction)
            }
            response = requests.post(server + "/query-engine/queries", json=data)
            return response  
        else:
            raise ValueError("executionUnitFunction must be decorated as QueryDecorator")

    @staticmethod
    def execute(server: str, 
                queryName: str, 
                shotList: list = None, 
                run: int = None, 
                pre_brief: str = None, 
                post_brief: str = None, 
                pre_keywords: str = None, 
                post_keywords: str = None):
        
        params = {
            "queryName": queryName,
            "shots[]": shotList,
            "run": run,
            "pre_brief": pre_brief,
            "post_brief": post_brief,
            "pre_keywords": pre_keywords,
            "post_keywords": post_keywords
        }

        response = requests.post(server + "/query-engine/executeQuery/execute", params=params)
        result = pickle.loads(response.content)
        return result

