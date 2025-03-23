from app import create_app
from pyspark.sql import SparkSession
from app.config import Config
import subprocess

if __name__ == '__main__':
    # Send to Spark Worker
    subprocess.run(["zip", "-r", "app.zip", "app"], check=True, stdout=subprocess.DEVNULL)

    # Initialize SparkSession
    # spark = SparkSession.builder.appName("Query").master("local[*]").getOrCreate()
    # spark = SparkSession.builder.appName("Query").master("local-cluster[1,1,1024]").config('spark.submit.pyFiles', 'app.zip').getOrCreate() # 1 executor, 2 cores, 1024MB mem
    spark = SparkSession.builder.appName("Query").master("spark://localhost:7077").config('spark.submit.pyFiles', 'app.zip').getOrCreate()
    
    app = create_app(spark.sparkContext, Config)
    app.run(host='localhost', port=5001, debug=False)
