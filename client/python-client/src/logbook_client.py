import requests
import pandas as pd

class LogbookClient:
    def __init__(self):
        self.baseUrl = "http://localhost:8081/logbook" 
        self.timeout = 10

    def get(self, endpoint, params = None):
        url = f"{self.baseUrl}/{endpoint}"
        response = requests.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()
        return response.json()["runs"]
    
    def getAllRuns(self):
        return self.get("runs")
    
    def getAllRunsAsDataFrame(self):
        return pd.DataFrame(self.getAllRuns())