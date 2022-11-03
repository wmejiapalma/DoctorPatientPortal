
import requests as req
from flask import Flask, jsonify, request, Response, session
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import py_eureka_client.eureka_client as eureka_client
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.PatientBLL as PatientBLL

#EUREKA DISCOVERY
SERVER_PORT = 3000
eureka_client.init(eureka_server="http://eureka:8761/eureka",
                   app_name="patientservice",
                   instance_port=SERVER_PORT)

#Flask app setup

app= Flask(__name__)
app.config.from_object('app.Config.ApplicationConfig')
#Getting the redis db for user sessions
server_session = Session(app)
#CORS 
#Once dockerized i will only allow the dockerized content through cors
cors = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
#User Password Encryption
bcrypt = Bcrypt(app)
#Helpful ENUM
RETURNJSON = "application/json"

@app.before_request
def log_request_info():
    pass
    #Happens before every request

@app.route('/health', methods=['GET'])
def json() -> str:
    app.logger.info("Health Check")
    return jsonify(STATUS="up")

#Only admin access should be able to use this
@app.route("/patients", methods=['GET'])
def get_patients() -> Response:
    '''
    RETURNS ALL PATIENTS AND INFORMATION
    '''
    try:
        return Response(PatientBLL.get_all_patients(), mimetype=RETURNJSON)
    except Exception as e:
        return Response((f"an error has occured \n {e}"), 500)

@app.route("/patients/<id>", methods=['GET'])
def get_patient(id) -> Response:
    return Response(PatientBLL.get_patient(id), mimetype=RETURNJSON,status=200)
@app.route("/find/patient" , methods=['GET'])
def find_patient() -> Response:
    return Response(PatientBLL.find_patient(request.json),mimetype=RETURNJSON,status=200)
@app.route("/patients", methods=['POST'])
def post_patient() -> Response:
    try:
        request.json["password"] = bcrypt.generate_password_hash(request.json["password"]).decode('utf-8') 
        patient = PatientBLL.insert_patient(request.json)
        return Response(patient, mimetype=RETURNJSON, status=201)
    except KeyError as e:
        return Response((f"Could not find {e} (maybe check spelling or caps?)"), 500)
@app.route("/patients/<id>", methods=['PUT'])
def put_patient(id) -> str:
    patient = request.json
    result = PatientBLL.update_patient(id, patient)
    return jsonify(result)
@app.route("/patients/<id>", methods=['DELETE'])
def delete_patient(id) -> str:
    PatientBLL.delete_patient(id)
    return jsonify({"message": f"Patient with id {id} deleted"})

#END OF CRUD
#START OF PATIENT SPECIFIC
@app.route("/patients/primarydoctor", methods=['GET'])
def get_primary_doctor() -> Response:
    '''
    Returns the primary doctor of the patient \n
    uses the session to get the patient id
    '''
    #throw not yet implemented
    return Response("Not Yet Implemented", mimetype=RETURNJSON,status=404)

@app.route("/patients/appointments", methods=['GET'])
def get_patient_appointments():
    '''
    Returns all appointments for the patient \n
    uses the session to get the patient id
    '''
    #throw not yet implemented
    try:
        pid = session.get("user_id")
        appointment_url = os.environ.get("APPOINTMENT_URL")    
        url = f"{appointment_url}/appointments/{pid}"
        appointments = req.request(method="GET",url=url)
        return jsonify(appointments.json())
    except Exception as e:
        return Response(f'An error has occured \n {e} \n {session.get("user_id")}', 500)

@app.route("/login",methods=["POST"])
def login() -> Response:
    try:
        patient = PatientBLL.find_first_patient(request.json)
        patient = PatientBLL.json_to_patient(patient)
        if(patient is None):
            return Response("Could not find patient", 404)
        if patient == None:
            return Response("Unauthorized",status=401)
        if bcrypt.check_password_hash(patient.password,request.json["password"]):
            session["user_id"] = patient._id
            print(session.get("user_id"))
            return Response("Login Successful",status=200)
        else:
            return Response("Unauthorized",status=401)
    except Exception as e:
        return Response(f"Error: {e}",status=500)

@app.route("/logout",methods=["GET"])
def log_out_user() -> Response:
    try:
        session.pop("user_id",None)
        return Response("Logout Successful",status=200)
    except Exception as e:
        return Response(f"Error: {e}",status=500)

@app.route("/whoami",methods=["GET"])
def whoami() -> Response:
    try:
        user_id = session.get("user_id")
        if user_id == None:
            return Response("Unauthorized",status=401)
        else:
            patient = PatientBLL.find_patient_by_id(user_id)
            patient = PatientBLL.json_to_patient(patient)
            return jsonify(patient.to_json())
    except Exception as e:
        return Response(f"Error: {e}",status=500)


@app.errorhandler(404)
def not_found(error):
    return Response(jsonify({
        'error': 'Not found',
        "Headers": ("%s",request.headers),
        "Body": ("%s",request.get_data())}), 404)



if __name__ == "__main__" and __package__ is None:
    print("PatientService is Running")
    app.run(host='0.0.0.0',debug=True, port=SERVER_PORT)
