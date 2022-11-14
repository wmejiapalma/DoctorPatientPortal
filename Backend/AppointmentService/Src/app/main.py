from flask import Flask, jsonify, request, json, Response
import json
import sys,os, logging
from logging.config import fileConfig
import py_eureka_client.eureka_client as eureka_client
import logging
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.AppointmentBLL as AppointmentBLL
SERVER_PORT = 3003
eureka_client.init(eureka_server="http://eureka:8761/eureka",
                   app_name="appointmentservice",
                   instance_port=SERVER_PORT)
app= Flask(__name__)
logging.basicConfig(level=logging.DEBUG, format = 'Debugging: %(asctime)s - %(levelname)s - %(message)s')

@app.before_request
def log_request_info():
    pass
    #Happens before every request

@app.route('/health', methods=['GET'])
def json() -> str:
    app.logger.info("Health Check")
    return jsonify(STATUS="up")

@app.route('/appointments', methods=['POST'])
def post_appointment() -> Response:
    try:
        app.logger.info("POST /appointments")
        appointment = AppointmentBLL.create_appointment(request.json)
        return jsonify(appointment.to_json())
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route('/appointments', methods=['GET'])
def get_appointments() -> Response:
    try:
        user_appointments = AppointmentBLL.get_all_appointments()
        app.logger.info("GET /appointments")
        app.logger.info(f"appointments: {user_appointments}")
        return jsonify(user_appointments)
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route("/appointments/<id>", methods=['GET'])
def get_appointment(id) -> Response:
    try:
        return jsonify(AppointmentBLL.get_appointments_by_pid(str(id)))
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route("/appointments/<id>", methods=['DELETE'])
def delete_appointment(id) -> Response:
    try:
        return jsonify(AppointmentBLL.delete_appointment(str(id)))
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route("/doctors", methods=['GET'])
def get_doctors() -> Response:
    try:
        return jsonify(AppointmentBLL.get_all_doctors())
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)
@app.route("/doctors/available", methods=['GET'])
def get_available_doctors() -> Response:
    try:
        return jsonify(AppointmentBLL.get_available_doctors())
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.errorhandler(404)
def not_found(error):
    return Response(jsonify({
        'error': 'Not found',
        "Headers": ("%s",request.headers),
        "Body": ("%s",request.get_data())}), 404)



if __name__ == "__main__" and __package__ is None:
    print("AppointmentService is Running")
    app.run(host='0.0.0.0',debug=True, port=SERVER_PORT)
