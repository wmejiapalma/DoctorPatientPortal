from email.mime.image import MIMEImage
import sys,os, json
from flask import jsonify, Response
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db
import app.objects.Employee as Employee
from bson import ObjectId

def create_employee(employee):
    '''
        INPUT: JSON object of employee
        Creates employee in database \n
        returns employee object
    '''
    new_employee = Employee.Employee(**employee)
    return db.insert(new_employee)

def get_all_employees():
    '''
        Gets all employees from database \n
        returns list of employees
    '''
    employees = db.get_all()
    emp_return = list()
    for employee in employees:
        emp_return.append(Employee.Employee(**employee).to_json())
    return emp_return
def find_employee_by_patientid(patient_id):
    '''
        INPUT: patient_id \n
        Gets all employees from database that have the patient_id under them \n
        returns list of employees
    '''
    try:
        employee = db.get_by_pid(patient_id)
        employee = Employee.Employee(**employee).to_json()
        return jsonify(employee)
    except Exception as e:
        return Response({f"employee with patient {patient_id} not found"},status=404)
def find_employee_by_id(id):
    '''
        INPUT: employee_id \n
        Gets employee from database by employee_id \n
        returns employee object
    '''
    try:
        employee = db.get_by_id(id)#only works if the id is a string
        employee = Employee.Employee(**employee).to_json()
        return jsonify(employee)
    except Exception as e:
        return Response({f"employee with id {id} not found"},status=404)
def find_employee_by_info(json):
    '''
        INPUT: JSON object with the following \n
        {
            firstname: string,
            lastname: string,
            DOB: date
            password: string
        }
        \n Gets employee based on the information provided
        returns employee object
    '''
    try:
        employee = db.get_by_info(json)
        return Employee.Employee(**employee)
    except Exception as e:
        return None
if __name__ == "__main__":
    pass