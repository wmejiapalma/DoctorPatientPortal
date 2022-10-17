from dataclasses import Field, dataclass
from datetime import date
from xml.dom.minidom import Document
from bson.objectid import ObjectId

@dataclass
class Patient(dict):
    firstname: str
    lastname: str
    DOB: date
    _id: ObjectId
    insurance_id: int
    def encode_patient(self):
        pass