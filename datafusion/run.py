from app import create_app
from pyspark.sql import SparkSession
from app.config import Config

if __name__ == '__main__':
    # Initialize SparkSession
    # sparkBuilder = SparkSession.builder.appName("Query").master("local[*]")
    # sparkBuilder = SparkSession.builder.appName("Query").master("local-cluster[1,2,1024]") # 1 executor, 2 cores, 1024MB mem
    sparkBuilder = SparkSession.builder.appName("Query").master("spark://localhost:7077")

    app = create_app(sparkBuilder, Config)
    app.run(host='localhost', port=5001, debug=True)
