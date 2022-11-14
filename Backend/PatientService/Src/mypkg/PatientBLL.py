import sys,os, json
import requests as req
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db
import app.objects.Patient as Patient
import bson.objectid as objectid
APPOINTMENT_URL = os.environ.get("APPOINTMENT_URL")    

def get_all_patients():
    all_patients = db.get_all_patients()
    patients = [p for p in all_patients]
    return json.dumps(patients,default=str)

def json_to_patient(json):
    _id = json["_id"] if "_id" in json else objectid.ObjectId()
    insurance_id = json["insurance_id"] if "insurance_id" in json else None
    new_patient = Patient.Patient (
        firstname=json["firstname"],
        lastname=json["lastname"],
        DOB=json["DOB"],
        password=json["password"],
        _id=_id,
        insurance_id=insurance_id
        )
    return new_patient
def get_patient(id):
    return json.dumps(db.get_patient(id),default=str)
def find_patient_by_id(id):
    '''
    Takes a patient ID and returns the object
    '''
    return db.get_patient(id)
def insert_patient(patient):
    patient = json_to_patient(patient)
    result = db.insert_patient(patient)
    #Return as json (we have to convert the dictionary into a json string to return it as a response object)
    return json.dumps(result.__dict__,default=str)
def update_patient(id, patient):
    try:
        patient = json_to_patient(patient)
        patient._id = id
        db.update_patient(id,patient)
        return patient.__dict__
    except Exception as e:
        return "Error: " + str(e)
def delete_patient(id):
    try:
        db.delete_patient(id)
    except Exception as e:
        return "Error: " + str(e)
def find_patient(patient):
    patient = json_to_patient(patient)
    result = db.find_patient_from_info(patient)
    return json.dumps(result,default=str)
def find_first_patient(patient):
    '''
    Returns the first patient found from the given patient
    RETURNS JSON OBJECT
    '''
    patient = json_to_patient(patient)
    result = db.find_patient_from_info(patient)
    if len(result) > 0:
        return result[0]
    else:
        return result
def get_primary_doctor(id):
    pass

#END OF CRUD
#START OF OTHER LOGIC (PATIENT SPECIFIC OR CROSS COM)

def get_patient_appointments(id):
    '''
    Returns all appointments for the patient \n
    Uses the sessionID to figure out who the patient is
    '''
    url = f"{APPOINTMENT_URL}/appointments/{id}"
    appointments = req.request(method="GET",url=url)
    return appointments.json()

def create_patient_appointment(appointment: dict):
    '''
    Creates an appointment for the patient \n
    Uses the sessionID to figure out who the patient is
    '''
    url = f"{APPOINTMENT_URL}/appointments"
    appointment = req.request(method="POST",url=url,json=appointment)
    return appointment.json()

def delete_patient_appointment(id):
    '''
    Deletes an appointment for the patient \n
    Uses the sessionID to figure out who the patient is
    '''
    url = f"{APPOINTMENT_URL}/appointments/{id}"
    appointment = req.request(method="DELETE",url=url)
    return appointment.json()
if __name__ == "__main__":
    print(get_all_patients())