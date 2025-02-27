from flask import Flask
from .database.db import init_db
from .routers.user_routes import user_blueprint
from .middleware.cors_middleware import CORSMiddleware
from app.config import Config

def create_app():
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

    return app
