from app.client.query_client import QueryClient

if __name__ == '__main__':
    url = "http://localhost:5001/api/executeQuery/execute"

    result = QueryClient.execute(url=url, queryName="testQuery1", shotList=[39390, 39391], run=100, post_brief="OK")
    print(result)