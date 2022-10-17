from flask import Flask, jsonify, request, json, Response
from json import loads
import sys,os, logging
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
from bson import json_util, ObjectId
from logging.config import fileConfig
from objects.Patient import Patient
import mypkg.PatientBLL as PatientBLL
app= Flask(__name__)
RETURNJSON = "application/json"
@app.before_request
def log_request_info():
    pass
    #Happens before every request

@app.route('/health', methods=['GET'])
def json() -> str:
    app.logger.info("Health Check")
    return jsonify(STATUS="up")


@app.route("/patients", methods=['GET'])
def get_patients() -> Response:
    try:
        return Response(PatientBLL.get_all_patients(), mimetype=RETURNJSON)
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route("/patients", methods=['POST'])
def post_patient() -> Response:
    try:
        patient = PatientBLL.insert_patient(request.json)
        return Response(patient, mimetype=RETURNJSON, status=201)
    except KeyError as e:
        return Response((f"Could not find {e} (maybe check spelling or caps?)"), 500)
    
@app.route("/patients/<id>", methods=['GET'])
def get_patient(id) -> Response:
    return Response(PatientBLL.get_patient(id), mimetype=RETURNJSON,status=200)
@app.route("/find/patient" , methods=['GET'])
def find_patient() -> Response:
    return Response(PatientBLL.find_patient(request.json),mimetype=RETURNJSON,status=200)
@app.route("/patients/<id>", methods=['PUT'])
def put_patient(id) -> str:
    patient = request.json
    result = PatientBLL.update_patient(id, patient)
    return jsonify(result)
@app.route("/patients/<id>", methods=['DELETE'])
def delete_patient(id) -> str:
    PatientBLL.delete_patient(id)
    return jsonify({"message": f"Patient with id {id} deleted"})

@app.errorhandler(404)
def not_found(error):
    return Response(jsonify({
        'error': 'Not found',
        "Headers": ("%s",request.headers),
        "Body": ("%s",request.get_data())}), 404)



if __name__ == "__main__" and __package__ is None:
    print("PatientService is Running")
    app.run(host='0.0.0.0',debug=True, port='3000')
