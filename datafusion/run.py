from app import create_app
from pyspark.sql import SparkSession

if __name__ == '__main__':
    # Initialize SparkSession
    spark = SparkSession.builder.appName("Query").master("local[*]").getOrCreate()

    app = create_app(spark)
    app.run(host='localhost', port=5001, debug=True)
