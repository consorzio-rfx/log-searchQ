from flask import Blueprint, request, jsonify
from ..utils.executor import *

executor_blueprint = Blueprint('executor', __name__)

@executor_blueprint.route('/executor', methods=['POST'])
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