from flask import Flask, jsonify, request
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
from mypkg.PatientBLL import say_hello_to
app= Flask(__name__)

@app.route('/test', methods=['GET'])
def test():
    return str("Hello World")

@app.route('/health', methods=['GET'])
def json() -> str:
    return jsonify(STATUS="up")

@app.route("/hello", methods=['POST'])
def hello() -> str:
    greetee = request.json.get("greetee", None)
    response = {"message": say_hello_to(greetee)}
    return jsonify(response)

if __name__ == "__main__" and __package__ is None:
    app.run(debug=True)
