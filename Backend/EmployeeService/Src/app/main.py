from flask import Flask, jsonify, request, json, Response, session
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from py_eureka_client import eureka_client
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.EmployeeBLL as bll

SERVER_PORT = 3002
eureka_client.init(eureka_server="http://eureka:8761/eureka",
                   app_name="employeeservice",
                   instance_port=SERVER_PORT)
app= Flask(__name__)
app.config.from_object('app.Config.ApplicationConfig')
server_session = Session(app)
cors = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

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
    request.json["password"] = bcrypt.generate_password_hash(request.json["password"]).decode('utf-8') 
    employee = request.get_json()
    new_emp = bll.create_employee(employee)
    return jsonify(new_emp.to_json())

#delete employee
@app.route('/employees/<id>', methods=['DELETE'])
def delete_employee(id):
    return bll.delete_employee_by_id(id)
@app.route('/employees/<patient_id>', methods=['GET'])
def get_employee_by_patient(patient_id):
    return bll.find_employee_by_patientid(patient_id)

@app.route('/employees/id/<employee_id>', methods=['GET'])
def get_employee_by_id(employee_id):
    app.logger.info("Getting employee by id %s", employee_id)
    return bll.find_employee_by_id(employee_id)
#update employee
@app.route('/employees/<id>', methods=['PUT'])
def update_employee(id):
    updated_emp = request.get_json()
    result = bll.update_employee_by_id(id, updated_emp)
    return result


#END OF CRUD

@app.route("/login",methods=["POST"])
def login() -> Response:
    try:
        sessionuser = session.get("user_id")
        if sessionuser is not None: #if user is already logged in
            return Response("User already logged in",status=200)
        person = bll.find_employee_by_info(request.get_json())
        if person is None:
            return Response("Unauthorized",status=401)
        if bcrypt.check_password_hash(person.password,request.json["password"]):
            session["user_id"] = person._id
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
            return bll.find_employee_by_id(user_id)
    except Exception as e:
        return Response(f"Error: {e}",status=500)


@app.errorhandler(404)
def not_found(error):
    return Response(jsonify({
        'error': 'Not found',
        "Headers": ("%s",request.headers),
        "Body": ("%s",request.get_data())}), 404)


if __name__ == "__main__" and __package__ is None:
    app.logger.info("Starting employee Service")
    app.run(host='0.0.0.0',debug=True, port=SERVER_PORT)
