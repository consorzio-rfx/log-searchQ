from logbook_client import LogbookClient
import pandas as pd

if __name__ == "__main__":
    logbookClient = LogbookClient()
    data = logbookClient.getAllRunsAsDataFrame()
    print(data.info())
    print(data)