from ..models.query_model import Query
from ..database.db import db

class QueryService:
    @staticmethod
    def getAllQueries():
        return Query.query.all()
    
    @staticmethod
    def getQueryByName(queryName):
        return Query.query.filter_by(queryName=queryName).first()
    
    @staticmethod
    def getDependencyQueries(queryName):
        query = QueryService.getQueryByName(queryName)
        dependencyQueries = []
        for dependency in query.dependencies:
            dependencyQuery = QueryService.getQueryByName(dependency)
            if dependencyQuery: 
                dependencyQueries.append(dependencyQuery)
        return dependencyQueries
    
    @staticmethod
    def getQueryById(id):
        return Query.query.get_or_404(id)
    
    @staticmethod
    def createQuery(queryName, dependencies, queryDescription, executionUnitFunction):
        try:
            query = Query(queryName=queryName, dependencies=dependencies, queryDescription=queryDescription, executionUnitFunction=executionUnitFunction)

            db.session.add(query)

            db.session.commit()

            return query 

        except Exception as e:
            db.session.rollback()
            raise ValueError(f"An unexpected error occurred: {str(e)}")
        
    @staticmethod
    def updateQuery(id, newQueryName, newDependencies, newQueryDescription, newExecutionUnitFunction):
        query = Query.query.get_or_404(id)
        query.queryName = newQueryName
        query.dependencies = newDependencies
        query.queryDescription = newQueryDescription
        query.executionUnitFunction = newExecutionUnitFunction
        db.session.commit()
        return query

    @staticmethod
    def deleteQuery(id):
        query = Query.query.get_or_404(id)
        db.session.delete(query)
        db.session.commit()
        return query
    


