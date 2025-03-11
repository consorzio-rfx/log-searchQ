from flask import Blueprint, request, jsonify
from ..utils import *
from ..services.query_service import QueryService

query_blueprint = Blueprint('query', __name__)

@query_blueprint.route('/queries', methods=['GET'])
def getAllQueries():
    queries = QueryService.getAllQueries()
    return jsonify([query.to_dict() for query in queries])

@query_blueprint.route('/queries', methods=['POST'])
def createQuery():
    try:
        # Get JSON data from the request
        data = request.get_json()

        queryName = data["queryName"]
        queryDescription = data["queryDescription"]
        executionUnit = data["executionUnit"]

        query = QueryService.createQuery(queryName, queryDescription, executionUnit)

        return jsonify(query.to_dict()), 201
    
    except Exception as e:
        # Handle any other unexpected errors
        return jsonify({"error": e}), 500 