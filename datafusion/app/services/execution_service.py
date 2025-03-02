from ..models.execution_model import Execution
from ..database.db import db

class ExecutionService:
    @staticmethod
    def getAllExecution():
        return Execution.query.all()
    
    @staticmethod
    def getExecution(executorName, executorInput):
        return Execution.query.filter_by(executorName=executorName, executorInput=executorInput).first()

    @staticmethod
    def createExecution(executorName, executorInput, executorOutput):
        try:
            execution = Execution(executorName=executorName, executorInput=executorInput, executorOutput=executorOutput)

            db.session.add(execution)

            db.session.commit()

            return execution 

        except Exception as e:
            db.session.rollback()
            raise ValueError(f"An unexpected error occurred: {str(e)}")
    


