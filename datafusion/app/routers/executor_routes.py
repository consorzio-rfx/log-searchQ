from flask import Blueprint, request, jsonify
from ..utils.executor import *
from ..services.execution_service import ExecutionService

executor_blueprint = Blueprint('executor', __name__)

@executor_blueprint.route('/executors', methods=['GET'])
def getAllExecution():
    executors = ExecutionService.getAllExecution()
    return jsonify([executor.to_dict() for executor in executors])

@executor_blueprint.route('/executors', methods=['POST'])
def execute():
    try:
        # Get JSON data from the request
        data = request.get_json()

        executorName = data["executorName"]
        executorInput = data["executorInput"]

        executor = ExecutorRegistry[executorName](executorName, executorInput)

        return executor.execute()

    
    except Exception as e:
        # Handle any other unexpected errors
        return jsonify({"error": e}), 500 