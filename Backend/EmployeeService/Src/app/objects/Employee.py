from dataclasses import dataclass, field
from sqlite3 import Date

from bson.objectid import ObjectId
#import objectid
from datetime import date

@dataclass
class Employee:
    '''
o	int employee_id \n
o	string firstname \n
o	string lastname \n
o	[ENUM] Position position \n
o	Date DOB \n
o	int patient_id \n
'''


    _id: ObjectId
    firstname: str
    lastname: str
    position: str
    DOB: date 
    patient_id: list = field(default_factory = list)

    def __init__(self, **kwargs) -> None:
        '''
        Takes in a dictionary of key value pairs and assigns them to the object
        '''
        self._id = kwargs.get("_id", ObjectId())
        self.firstname = kwargs.get("firstname", None)
        self.lastname = kwargs.get("lastname", None)
        self.position = kwargs.get("position", None)
        self.DOB = kwargs.get("DOB", None)
        self.patient_id = kwargs.get("patient_id", None)
    def to_json(self):
        
        return {
            "_id": self._id.__str__(),
            "firstname": self.firstname,
            "lastname": self.lastname,
            "position": self.position,
            "DOB": self.DOB,
            "patient_id": self.patient_id
        }