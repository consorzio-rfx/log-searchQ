from flask import Blueprint, request, jsonify, abort, Response
from ..utils import *
from ..services.query_service import QueryService
from ..database.db import db
from sqlalchemy import text
from ..utils.query_executor import QueryExecutor, QueryInput, QueryInputBuilder
import pickle

def createExecuteQueryBlueprint(sparkContext):
    execute_query_blueprint = Blueprint('execute_query', __name__)

    @execute_query_blueprint.route('/query-engine/executeQuery/selectQuery', methods=['GET'])
    def selectQuery():
        queryName = request.args.get('queryName', type=str)
        query = QueryService.getQueryByName(queryName)
        return jsonify(query.to_dict())
    
    def getQueryInput(request) -> QueryInput:
        shotList = request.args.getlist('shots[]', type=int)
        run = request.args.get('run', type=int, default=-1) 
        pre_brief = request.args.get('pre_brief', default='') 
        post_brief = request.args.get('post_brief', default='') 
        pre_keywords = request.args.get('pre_keywords', default='') 
        post_keywords = request.args.get('post_keywords', default='')
        queryInput = QueryInputBuilder(shotList=shotList, run=run, pre_brief=pre_brief, post_brief=post_brief, pre_keywords=pre_keywords, post_keywords = post_keywords).build() 
        return queryInput

    @execute_query_blueprint.route('/query-engine/executeQuery/searchShots', methods=['GET'])
    def searchShots():
        queryInput = getQueryInput(request)
        return jsonify([dict(row) for row in queryInput.getShotDetails()])
    
    @execute_query_blueprint.route('/query-engine/executeQuery/execute', methods=['POST'])
    def execute():
        queryName = request.args.get('queryName', type=str)
        query = QueryService.getQueryByName(queryName)
        if query is None:
            abort(404)

        queryInput = getQueryInput(request) 

        results = QueryExecutor.execute(sparkContext=sparkContext, query=query, queryInput=queryInput)
        print(results)

        js = request.args.get('js', default='0')
        if js == '0':
            # For Client API
            pickled_result = pickle.dumps(results)
            return Response(pickled_result, content_type='application/octet-stream')
        
        # For Front-End
        return jsonify({key: str(value) for key, value in results.items()})                
    
    return execute_query_blueprint