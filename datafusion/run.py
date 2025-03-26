from app import create_app
from pyspark.sql import SparkSession
from app.config import Config
import subprocess
import os

if __name__ == '__main__':
    os.environ['PYSPARK_PYTHON'] = '/opt/bitnami/python/bin/python'
    os.environ['PYSPARK_DRIVER_PYTHON'] = '/opt/bitnami/python/bin/python'

    # Send to Spark Worker
    subprocess.run(["zip", "-r", "app.zip", "app"], check=True, stdout=subprocess.DEVNULL)

    # Initialize SparkSession Locally
    # spark = SparkSession.builder.appName("Query").master("local[*]").getOrCreate()
    # spark = SparkSession.builder.appName("Query").master("local-cluster[1,1,1024]").config('spark.submit.pyFiles', 'app.zip').getOrCreate() # 1 executor, 2 cores, 1024MB mem
    
    # Initialize SparkSession
    SPARK_MASTER_URL = os.getenv('SPARK_MASTER_URL', '"spark://localhost:7077')  
    spark = SparkSession.builder.appName("Query").master(SPARK_MASTER_URL).config('spark.submit.pyFiles', 'app.zip').getOrCreate()
    
    app = create_app(spark.sparkContext, Config)
    app.run(host='localhost', port=5001, debug=False)
