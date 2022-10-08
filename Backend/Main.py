from flask import Flask, jsonify, request
app= Flask(__name__)


@app.route('/test', methods=['GET'])
def test():
    return str("Hello World")

@app.route("/name", methods=["POST"])
def setName():
    if request.method=='POST':
        posted_data = request.get_json()
        data = posted_data['data']
        return jsonify(str("Successfully stored  " + str(data)))




if __name__=='__main__':
    app.run(debug=True)