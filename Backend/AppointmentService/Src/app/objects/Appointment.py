from dataclasses import dataclass
from sqlite3 import Date

from bson.objectid import ObjectId
#import objectid
from datetime import date

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
        self.patient_id = kwargs.get("patient_id", None)
        self.date_of_appointment = kwargs.get("date_of_appointment", None)
        self.status = kwargs.get("status", None)
        self.appointment_type = kwargs.get("appointment_type", None)
    def to_json(self):
        
        return {
            "_id": self._id.__str__(),
            "doctor_id": self.doctor_id,
            "patient_id": self.patient_id,
            "date_of_appointment": self.date_of_appointment,
            "status": self.status,
            "appointment_type": self.appointment_type
        }