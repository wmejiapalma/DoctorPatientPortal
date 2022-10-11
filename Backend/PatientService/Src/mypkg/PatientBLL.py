import sys,os, json
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db

def get_all_patients():
    all_patients = db.get_all_patients()
    patients = [p for p in all_patients]
    return json.dumps(patients,default=str)
    
def get_patient(id):
    return db.get_patient(id)
def insert_patient(patient):
    db.insert_patient(patient)
def update_patient(patient):
    db.update_patient(patient)
def delete_patient(id):
    db.delete_patient(id)

if __name__ == "__main__":
    print(get_all_patients())