import pytest
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
from app import main

@pytest.fixture #this passes the flask testing env to the tests (yield means its waiting for tests to happen)
def client():
    main.app.config['TESTING'] = True
    client = main.app.test_client()
    yield client
