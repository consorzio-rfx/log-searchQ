from flask import Blueprint, request, jsonify
from ..utils import *
from ..services.execution_unit_service import ExecutionUnitService

execution_unit_blueprint = Blueprint('execution_unit', __name__)

@execution_unit_blueprint.route('/query-engine/executionUnits', methods=['GET'])
def getAllExecutionUnits():
    executionUnits = ExecutionUnitService.getAllExecutionUnits()
    return jsonify([executionUnit.to_dict() for executionUnit in executionUnits])

@execution_unit_blueprint.route('/query-engine/executionUnits/<int:id>', methods=['DELETE'])
def deleteExecutionUnit(id):
    executionUnit = ExecutionUnitService.deleteExecutionUnit(id)
    return jsonify(executionUnit.to_dict())
