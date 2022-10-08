from flask import Flask, jsonify, request

app= Flask(__name__)

@app.route('/test', methods=['GET'])
def test():
    return str("Hello World")

@app.route('/health', methods=['GET'])
def json() -> str:
    return jsonify(STATUS="up")

if __name__ == '__main__':
    app.run(debug=True)
