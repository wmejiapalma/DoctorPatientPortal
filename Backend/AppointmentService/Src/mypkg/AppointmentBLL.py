import sys,os, json
from Backend.AppointmentService.Src import app
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db
import app.objects.Appointment as Appointment

def create_appointment(appointment):
    parsed_json = json.dumps(appointment)
    print(appointment)
    new_appointment = Appointment(parsed_json)
    db.insert_appointment(new_appointment)


if __name__ == "__main__":
    pass