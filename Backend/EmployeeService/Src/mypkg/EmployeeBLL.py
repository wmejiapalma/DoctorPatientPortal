from email.mime.image import MIMEImage
import sys,os, json
from flask import jsonify, Response
sys.path.append(os.path.join(os.path.dirname(__file__), '..')) 
import mypkg.Database as db
import app.objects.Employee as Employee
from bson import ObjectId
import requests as req
APPOINTMENT_URL = os.environ.get("APPOINTMENT_URL")
#the functions that return objects should not be formatted as a response object
#the functions that return responses (200,404,500) should return Response Objects

def create_employee(employee):
    '''
        INPUT: JSON object of employee
        Creates employee in database \n
        returns employee object
    '''
    print(employee)
    new_employee = Employee.Employee(**employee)
    db.insert(new_employee)
    return new_employee

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
        employee = Employee.Employee(**employee).to_json_unsafe()
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
        print(e)
        return None
def delete_employee_by_id(id):
    '''
        INPUT: employee_id \n
        Deletes employee from database by employee_id \n
        Returns Response Object
        200: if employee was deleted
        404: if employee was not found
        500: if an error occured
    '''
    try:
        res = db.delete_by_id(id)
        print(res)
        if(res > 0):
            return Response(status=200)
        return Response(status=404)
    except Exception as e:
        return Response(status=500)
def update_employee_by_id(id,new_employee):
    '''
        INPUT: employee_id \n
        Updates employee from database by employee_id \n
        Returns Response Object
        200: if employee was updated
        404: if employee was not found
        500: if an error occured
    '''
    new_employee = Employee.Employee(**new_employee)
    try:
        res = db.update_by_id(id,new_employee)
        if(res > 0):
            return Response(status=200)
        return Response(status= 404)
    except Exception as e:
        print(e)
        return Response(status=500)
def get_doctors():
    '''
        Gets all doctors from database \n
        returns list of doctors
    '''
    doctors = db.get_all_doctors()
    doc_return = list()
    for doctor in doctors:
        doc_return.append(Employee.Employee(**doctor).to_json())
    return doc_return

def get_appointments(id):
    url = f"{APPOINTMENT_URL}/appointments/employee/{id}"
    appointment = req.request(method="GET",url=url)
    return appointment.json()
if __name__ == "__main__":
    pass