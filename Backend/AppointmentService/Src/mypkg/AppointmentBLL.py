import sys,os, json
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db
import app.objects.Appointment as Appointment
from bson import ObjectId

def create_appointment(appointment):
    '''
        Creates appointment object from json \n
        inserts appointment into database \n
        returns appointment object
    '''
    new_appointment = Appointment.Appointment(**appointment)
    db.insert_appointment(new_appointment)
    return new_appointment

def get_all_appointments():
    '''
        Gets all appointments from database \n
        returns list of appointments
    '''
    appointments = db.get_all_appointments()
    app_return = list()
    for appointment in appointments:
        app_return.append(Appointment.Appointment(**appointment).to_json())
    return app_return
def get_appointments_by_pid(pid:str):
    '''
        INPUT: patient_id: str
        Returns all appointments with a matching patient_id \n
        uses raw pid string since they are stored as text in the database
    '''
    appointments = db.get_appointments_by_pid(pid)
    app_return = list()
    for appointment in appointments:
        app_return.append(Appointment.Appointment(**appointment).to_json())
    return app_return
def delete_appointment(id:str):
    '''
        INPUT: id: str
        Deletes appointment with matching id \n
        convets id to ObjectId
    '''
    db.mongo_collection.delete_one({"_id":ObjectId(id)})
    return "Successfully deleted appointment"
if __name__ == "__main__":
    pass