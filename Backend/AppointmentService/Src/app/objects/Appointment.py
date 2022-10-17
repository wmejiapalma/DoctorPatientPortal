from dataclasses import dataclass
from sqlite3 import Date

from bson.objectid import ObjectId
#import objectid
from datetime import date

@dataclass
class Appointment:
    '''o	Doctor doctor
o	Patient patient
o	Date DateOfAppointment
o	[ENUM] STATUS status
o	[ENUM] AppointmentType
'''
    _id: ObjectId
    doctor_id: int
    patient_id: int
    date_of_appointment: date
    status: str
    appointment_type: str