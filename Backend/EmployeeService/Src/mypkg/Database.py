from pymongo import MongoClient
from dotenv import load_dotenv
import sys,os
load_dotenv()
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
print("Connecting to Mongo Database....")
mongo_connection = MongoClient(os.environ.get('MONGO_URL'))
mongo_db = mongo_connection.employee
mongo_collection = mongo_db.employees
print(f"Successfully connected to Mongo Database: {os.environ.get('MONGO_URL')}")

def insert(appointment):
    mongo_collection.insert_one(appointment.to_json())

def get_all():
    return list(mongo_collection.find())
def get_by_pid(pid:str):
    '''
    Gets employee object by patient_id associated with them
    returns single employee object
    '''
    return mongo_collection.find_one({"patient_id":pid})
def get_all_by_pid(pid):
    '''
    Gets all employee objects by patient_id associated with them
    returns list of employee objects
    '''
    return list(mongo_collection.find({"patient_id":{"patient_id":pid}}))
def get_by_id(id):
    '''
    Takes in an ObjectId
    Gets employee object by id \n
    returns single employee object
    '''
    return mongo_collection.find_one({"_id":id})
def get_by_info(person):
    return list(mongo_collection.find({"firstname":person.firstname,"lastname":person.lastname,"DOB":person.DOB}))
if __name__ == "__main__":
    print("this is a module")