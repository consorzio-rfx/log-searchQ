from flask import Blueprint, request, jsonify, abort
from ..utils import *
from ..services.query_service import QueryService
from ..database.db import db
from sqlalchemy import text
from ..utils.query_executor import QueryExecutor, QueryInput
from pyspark.sql import SparkSession

def createExecuteQueryBlueprint(spark: SparkSession):
    execute_query_blueprint = Blueprint('execute_query', __name__)

    @execute_query_blueprint.route('/api/executeQuery/selectQuery', methods=['GET'])
    def selectQuery():
        queryName = request.args.get('queryName', type=str)
        query = QueryService.getQueryByName(queryName)
        return jsonify(query.to_dict())

    @execute_query_blueprint.route('/api/executeQuery/searchShots', methods=['GET'])
    def searchShots():
        shotList = request.args.getlist('shots[]', type=int)
        sql = text("SELECT * FROM shots WHERE shot IN ({})".format(", ".join(map(str, shotList))))
        result = db.session.execute(sql).mappings().all()
        return jsonify([dict(row) for row in result])

    @execute_query_blueprint.route('/api/executeQuery/execute', methods=['POST'])
    def execute():
        queryName = request.args.get('queryName', type=str)
        shotList = request.args.getlist('shots[]', type=int)
        query = QueryService.getQueryByName(queryName)
        if query is None:
            abort(404)

        queryInput = QueryInput(shotList=shotList)
        result = QueryExecutor.execute(spark=spark, query=query, queryInput=queryInput)
        print(result)
        return jsonify({ "status": "cached" })
    
    return execute_query_blueprint