import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://helloworld:helloworld@localhost:5432/newlogbookdb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
