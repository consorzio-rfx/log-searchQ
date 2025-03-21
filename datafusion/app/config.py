import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://helloworld:helloworld@localhost:5432/logbookdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ConfigSpark:
    # SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://helloworld:helloworld@localhost:5432/logbookdb') 
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://helloworld:helloworld@postgresql-server:5432/logbookdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False