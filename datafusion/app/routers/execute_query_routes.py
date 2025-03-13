from flask import Blueprint, request, jsonify
from ..utils import *
from ..services.query_service import QueryService
from ..database.db import db
from sqlalchemy import text

execute_query_blueprint = Blueprint('execute_query', __name__)

@execute_query_blueprint.route('/api/executeQuery/selectQuery', methods=['GET'])
def selectQuery():
    queryName = request.args.get('queryName', type=str)
    query = QueryService.getQueryByName(queryName)
    return jsonify(query.to_dict())

@execute_query_blueprint.route('/api/executeQuery/searchShots', methods=['GET'])
def searchInput():
    shots = request.args.getlist('shots[]', type=int)
    sql = text("SELECT * FROM shots WHERE shot IN ({})".format(", ".join(map(str, shots))))
    print(sql)
    result = db.session.execute(sql).mappings().all()
    return jsonify([dict(row) for row in result])

@execute_query_blueprint.route('/api/executeQuery/execute', methods=['POST'])
def executeQuery():
    pass