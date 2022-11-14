cd .\Backend\

cd .\AppointmentService\
pip freeze > requirements.txt

cd ..\

cd .\EmployeeService\
pip freeze > requirements.txt

cd ..\

cd .\PatientService\
pip freeze > requirements.txt

cd ..\..\


cd .\Build\
docker-compose build
docker-compose up -d
