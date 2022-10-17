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

def insert_patient(appointment):
    mongo_collection.insert_one(appointment)

if __name__ == "__main__":
    print("this is a module")