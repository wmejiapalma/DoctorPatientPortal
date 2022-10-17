#to run tests use the command: python -m pytest -s
TESTUSERID = "634da262708bd35f23733444"
def test_health(client):
    #gets an endpoint
    response = client.get('/health')
    #stores the json response
    result = response.get_json()
    assert result is not None
    assert "STATUS" in result
    assert result["STATUS"] == "up"
def test_get_all_patients(client):
    response = client.get('/patients')
    result = response.get_json()
    assert result is not None
    assert len(result) > 0
    assert "firstname" in result[0]
    assert "lastname" in result[0]
    assert "DOB" in result[0]
    assert "insurance_id" in result[0]
    assert "id" in result[0]
def test_get_patient(client):
    response = client.get(f'/patients/{TESTUSERID}')
    result = response.get_json()
    assert result is not None
    assert "firstname" in result
    assert "lastname" in result
    assert "DOB" in result
    assert "insurance_id" in result
    assert "id" in result
def test_insert_patient(client):
    patient = {
        "firstname":"test",
        "lastname":"test",
        "DOB":"2020-09-09",
        "insurance_id":123456789
    }
    response = client.post('/patients',json=patient)
    result = response.get_json()
    assert result is not None
    assert "firstname" in result
    assert "lastname" in result
    assert "DOB" in result
    assert "insurance_id" in result
    assert "id" in result
