from ..models.query_model import Query
from ..database.db import db

class QueryService:
    @staticmethod
    def getAllQueries():
        return Query.query.all()
    
    @staticmethod
    def getQuery(queryName):
        return Query.query.filter_by(queryName=queryName).first()
    
    @staticmethod
    def createQuery(queryName, queryDescription, executionUnitFunction):
        try:
            query = Query(queryName=queryName, queryDescription=queryDescription, executionUnitFunction=executionUnitFunction)

            db.session.add(query)

            db.session.commit()

            return query 

        except Exception as e:
            db.session.rollback()
            raise ValueError(f"An unexpected error occurred: {str(e)}")
    


