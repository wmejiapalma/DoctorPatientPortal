from pymongo import MongoClient
from dotenv import load_dotenv
import sys,os
load_dotenv()
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
from app.objects.Patient import Patient

print("Connecting to Mongo Database....")
mongo_connection = MongoClient(os.environ.get('MONGO_URL'))
mongo_db = mongo_connection.patients
mongo_collection = mongo_db.patients
print(f"Successfully connected to Mongo Database: {os.environ.get('MONGO_URL')}")


def insert_patient(patient:Patient):
    mongo_collection.insert_one(patient)
def delete_patient(id):
    mongo_collection.delete_one({"id":id})
def update_patient(patient:Patient):
    mongo_collection.update_one({"id":patient.id}, {"$set": patient})
def get_patient(id):
    return mongo_collection.find_one({"id":id})
def get_all_patients():
    return list(mongo_collection.find())

if __name__ == "__main__":
    print("this is a module")