from dataclasses import dataclass
from datetime import date


@dataclass
class Patient:
    id: str
    firstname: str
    lastname: str
    DOB: date
    insurance_id: int
    