from flask import Flask, jsonify, request, json, Response
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.PatientBLL as PatientBLL
app= Flask(__name__)

@app.route('/health', methods=['GET'])
def json() -> str:
    return jsonify(STATUS="up")

@app.route("/hello", methods=['POST'])
def hello() -> str:
    greetee = request.json.get("greetee", None)
    response = {"message": f"Hello {greetee}"}
    return jsonify(response)
@app.route("/patients", methods=['GET'])
def get_patients() -> Response:
    return Response(PatientBLL.get_all_patients(), mimetype='application/json')
@app.route("/patients", methods=['POST'])
def post_patient() -> str:
    try:
        patient = request.json
        PatientBLL.insert_patient(patient)
        return jsonify(patient["id"])
    except Exception as e:
        return jsonify(f"an error has occured \n {e}")

    
@app.route("/patients/<id>", methods=['GET'])
def get_patient(id) -> str:
    return jsonify(PatientBLL.get_patient(id))
@app.route("/patients/<id>", methods=['PUT'])
def put_patient(id) -> str:
    patient = request.json
    PatientBLL.update_patient(patient)
    return jsonify(patient)
@app.route("/patients/<id>", methods=['DELETE'])
def delete_patient(id) -> str:
    PatientBLL.delete_patient(id)
    return jsonify({"message": f"Patient with id {id} deleted"})

if __name__ == "__main__" and __package__ is None:
    print("PatientService is Running")
    app.run(host='0.0.0.0',debug=True, port='3000')
