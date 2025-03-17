from flask import Flask
from .database.db import init_db
from .routers.user_routes import user_blueprint
from .routers.query_routes import query_blueprint
from .routers.execution_unit_routes import execution_unit_blueprint
from .routers.execute_query_routes import createExecuteQueryBlueprint
from .middleware.cors_middleware import CORSMiddleware
from app.config import Config
from pyspark.sql import SparkSession

def create_app(spark: SparkSession):
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize the database
    init_db(app)

    # Enable CORS using the custom middleware
    CORSMiddleware(
        app,
        allowed_origins=["*"], 
        allowed_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowed_headers=["Content-Type", "Authorization"]
    )

    # Register blueprints
    app.register_blueprint(user_blueprint)
    app.register_blueprint(query_blueprint)
    app.register_blueprint(execution_unit_blueprint)
    app.register_blueprint(createExecuteQueryBlueprint(spark))

    return app
