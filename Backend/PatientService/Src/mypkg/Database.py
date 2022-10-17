from pymongo import MongoClient
from bson import json_util, ObjectId
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


def insert_patient(patient):
    mongo_collection.insert_one(patient.__dict__)
    return patient
def delete_patient(id):
    mongo_collection.delete_one({"_id":ObjectId(id)})
def update_patient(id, patient:Patient):
    mongo_collection.update_one({"_id":ObjectId(id)}, {"$set": {
        "firstname":patient.firstname,
        "lastname":patient.lastname,
        "DOB":patient.DOB,
        "insurance_id":patient.insurance_id
    }})
def get_patient(id):
    return mongo_collection.find_one({"_id":ObjectId(id)})
def get_all_patients():
    return list(mongo_collection.find())
def find_patient_from_info(patient):
    return list(mongo_collection.find({"firstname":patient.firstname,"lastname":patient.lastname,"DOB":patient.DOB}))
if __name__ == "__main__":
    print("this is a module")