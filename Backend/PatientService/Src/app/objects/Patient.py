from dataclasses import Field, dataclass, field
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
    password: str = field(init=True,repr=False)
    admin: bool = False
    def to_json(self):
        return {
            "_id": self._id.__str__(),
            "firstname": self.firstname,
            "lastname": self.lastname,
            "DOB": self.DOB,
            "insurance_id": self.insurance_id,
            "admin": self.admin
        }