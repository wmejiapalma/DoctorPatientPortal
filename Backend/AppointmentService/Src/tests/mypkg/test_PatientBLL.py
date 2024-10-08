#to run tests use the command: python -m pytest -s
def test_health(client):
    #gets an endpoint
    response = client.get('/health')
    #stores the json response
    result = response.get_json()
    assert result is not None
    assert "STATUS" in result
    assert result["STATUS"] == "up"

