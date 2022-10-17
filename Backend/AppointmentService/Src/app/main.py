from flask import Flask, jsonify, request, json, Response
import sys,os, logging
from logging.config import fileConfig
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
from mypkg.AppointmentBLL import create_appointment
app= Flask(__name__)

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
        appointment = request.json
        create_appointment(appointment)
        return jsonify(appointment["_id"])
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
    app.run(host='0.0.0.0',debug=True, port='3000')
