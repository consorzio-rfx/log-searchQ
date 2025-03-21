from app import create_app
from pyspark.sql import SparkSession
from app.config import Config
import subprocess

if __name__ == '__main__':
    # Send to Spark Worker
    subprocess.run(["zip", "-r", "app.zip", "app"], check=True, stdout=subprocess.DEVNULL)

    # Initialize SparkSession
    # sparkBuilder = SparkSession.builder.appName("Query").master("local[*]")
    # sparkBuilder = SparkSession.builder.appName("Query").master("local-cluster[1,1,1024]").config('spark.submit.pyFiles', 'app.zip') # 1 executor, 2 cores, 1024MB mem
    sparkBuilder = SparkSession.builder.appName("Query").master("spark://localhost:7077").config('spark.submit.pyFiles', 'app.zip')
    
    app = create_app(sparkBuilder, Config)
    app.run(host='localhost', port=5001, debug=True)
