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
        self.password = kwargs.get("password",None)
    def to_json_unsafe(self):
        '''
            WARNING: This method will return the hashed password of the employee \n
            Returns a JSON Object of the object
        '''
        return {
            "_id": self._id.__str__(),
            "firstname": self.firstname,
            "lastname": self.lastname,
            "position": self.position,
            "DOB": self.DOB,
            "patient_id": self.patient_id,
            "password": self.password
        }
    def to_json(self):
        '''
            Returns a JSON Object of the object without the password \n
            Safe for API calls
        '''
        output = self.to_json_unsafe()
        output.pop("password")
        return output
    def get_id(self):
        return self._id.__str__()