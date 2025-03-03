from app import create_app
from app.services.execution_service import ExecutionService

if __name__ == '__main__':
    app = create_app()
    with app.app_context(): 
        executors = ExecutionService.getAllExecution()
        print([executor.to_dict() for executor in executors])