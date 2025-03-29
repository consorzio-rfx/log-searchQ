import requests
import pickle

class QueryClient:
    @staticmethod
    def createQuery(url: str, queryName: str, dependencies: list, queryDescription: str, executionUnitFunction: str):
        data = {
            "queryName": queryName,
            "dependencies": ", ".join(dependencies),
            "queryDescription": queryDescription,
            "executionUnitFunction": executionUnitFunction
        }
        response = requests.post(url, json=data)
        return response 

    @staticmethod
    def execute(url: str, 
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

        response = requests.post(url, params=params)
        result = pickle.loads(response.content)
        return result

