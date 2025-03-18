from app import create_app
from pyspark.sql import SparkSession

if __name__ == '__main__':
    # Initialize SparkSession
    # sparkBuilder = SparkSession.builder.appName("Query").master("local[*]")
    sparkBuilder = SparkSession.builder.appName("Query").master("spark://localhost:7077")

    app = create_app(sparkBuilder)
    app.run(host='localhost', port=5001, debug=True)
