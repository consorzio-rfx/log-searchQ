from ..models.execution_unit_model import ExecutionUnit 
from ..database.db import db
from sqlalchemy.exc import IntegrityError

class ExecutionUnitService:
    @staticmethod
    def getAllExecutionUnits():
        return ExecutionUnit.query.all()
    
    @staticmethod
    def getExecutionUnit(queryName, shot):
        return ExecutionUnit.query.filter_by(queryName=queryName, shot=shot).first()
    
    @staticmethod
    def createExecutionUnit(queryName, shot, result):
        try:
            executionUnit = ExecutionUnit(queryName=queryName, shot=shot, result=result)

            db.session.add(executionUnit)

            db.session.commit()

            return executionUnit 
        
        except Exception as e:
            db.session.rollback()
            if 'duplicate key value violates unique constraint' in str(e.orig):
                print("duplicate key value violates unique constraint")
                return

            raise ValueError(f"An unexpected error occurred: {str(e)}")
    


