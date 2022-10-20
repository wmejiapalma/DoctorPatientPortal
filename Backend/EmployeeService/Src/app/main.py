from flask import Flask, jsonify, request, json, Response
import json
import sys,os, logging
from logging.config import fileConfig
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.EmployeeBLL as bll
app= Flask(__name__)

@app.before_request
def log_request_info():
    pass
    #Happens before every request

@app.route('/health', methods=['GET'])
def json() -> str:
    app.logger.info("Health Check")
    return jsonify(STATUS="up")

@app.route('/employees', methods=['GET'])
def get_all_employees():
    app.logger.info("Getting all employees")
    return jsonify(bll.get_all_employees())
@app.route('/employees', methods=['POST'])
def create_employee():
    app.logger.info("Creating new employee")
    employee = request.get_json()
    return jsonify(bll.create_employee(employee))
@app.route('/employees/<patient_id>', methods=['GET'])
def get_employee_by_patient(patient_id):
    return bll.find_employee_by_patientid(patient_id)


@app.errorhandler(404)
def not_found(error):
    return Response(jsonify({
        'error': 'Not found',
        "Headers": ("%s",request.headers),
        "Body": ("%s",request.get_data())}), 404)


if __name__ == "__main__" and __package__ is None:
    app.logger.info("Starting employee Service")
    app.run(host='0.0.0.0',debug=True, port='3002')
