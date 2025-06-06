from flask import Blueprint, request, jsonify
from ..utils import *
from ..services.query_service import QueryService

query_blueprint = Blueprint('query', __name__)

@query_blueprint.route('/query-engine/queries', methods=['GET'])
def getAllQueries():
    queries = QueryService.getAllQueries()
    return jsonify([query.to_dict() for query in queries])

@query_blueprint.route('/query-engine/queries/<int:id>', methods=['GET'])
def getQueryById(id):
    query = QueryService.getQueryById(id)
    return jsonify(query.to_dict())

@query_blueprint.route('/query-engine/queries', methods=['POST'])
def createQuery():
    try:
        # Get JSON data from the request
        data = request.get_json()

        queryName = data["queryName"]
        dependencies = [item.strip() for item in data["dependencies"].split(',')] 
        queryDescription = data["queryDescription"]
        executionUnitFunction = data["executionUnitFunction"]

        query = QueryService.createQuery(queryName, dependencies, queryDescription, executionUnitFunction)

        return jsonify(query.to_dict()), 201
    
    except Exception as e:
        # Handle any other unexpected errors
        return jsonify({"error": e}), 500 
    
@query_blueprint.route('/query-engine/queries/<int:id>', methods=['PUT'])
def updateQuery(id):
    # Get JSON data from the request
    data = request.get_json()

    queryName = data["queryName"]
    dependencies = [item.strip() for item in data["dependencies"].split(',')] 
    queryDescription = data["queryDescription"]
    executionUnitFunction = data["executionUnitFunction"]

    query = QueryService.updateQuery(id, queryName, dependencies, queryDescription, executionUnitFunction)
    return jsonify(query.to_dict())

@query_blueprint.route('/query-engine/queries/<int:id>', methods=['DELETE'])
def deleteQuery(id):
    query = QueryService.deleteQuery(id)
    return jsonify(query.to_dict())