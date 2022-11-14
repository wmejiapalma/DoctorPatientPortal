from dataclasses import dataclass
import os 
from bson.objectid import ObjectId
#import objectid
from datetime import date
import requests as req
EMPLOYEE_URL = os.environ.get("EMPLOYEE_SERVICE_URL")  
@dataclass
class Appointment:
    '''o	int doctor_id \n
o	int patient_id \n
o	Date DateOfAppointment \n
o	[ENUM] STATUS status \n
o	[ENUM] AppointmentType \n
'''

    _id: ObjectId
    doctor_id: int
    doctor_name: str
    patient_id: int
    date_of_appointment: date
    status: str
    appointment_type: str
    def __init__(self, **kwargs) -> None:
        '''
        Takes in a dictionary of key value pairs and assigns them to the object
        '''
        self._id = kwargs.get("_id", ObjectId())
        self.doctor_id = kwargs.get("doctor_id", None)
        self.doctor_name = kwargs.get("doctor_name", None)
        self.patient_id = kwargs.get("patient_id", None)
        self.date_of_appointment = kwargs.get("date_of_appointment", None)
        self.status = kwargs.get("status", None)
        self.appointment_type = kwargs.get("appointment_type", None)
    def get_doctor_name(self):
        #TODO get doctor name from employee service using doctor_id
        url = f"{EMPLOYEE_URL}/employees/id/{self.doctor_id}"
        employee = req.request(method="GET",url=url)
        if employee.status_code == 200:
            return employee.json()["name"]
        return None
    def to_json(self):
        
        return {
            "_id": self._id.__str__(),
            "doctor_id": self.doctor_id,
            "doctor_name": self.doctor_name,
            "patient_id": self.patient_id,
            "date_of_appointment": self.date_of_appointment,
            "status": self.status,
            "appointment_type": self.appointment_type
        }