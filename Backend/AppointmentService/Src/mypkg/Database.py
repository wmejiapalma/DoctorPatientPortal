from pymongo import MongoClient
from dotenv import load_dotenv
import sys,os
load_dotenv()
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
print("Connecting to Mongo Database....")
mongo_connection = MongoClient(os.environ.get('MONGO_URL'))
mongo_db = mongo_connection.appointments
mongo_collection = mongo_db.appointments
print(f"Successfully connected to Mongo Database: {os.environ.get('MONGO_URL')}")

def insert_appointment(appointment):
    mongo_collection.insert_one(appointment.to_json())

def get_all_appointments():
    return list(mongo_collection.find())
def get_appointments_by_pid(object_id):
    return list(mongo_collection.find({"patient_id":object_id}))
if __name__ == "__main__":
    print("this is a module")