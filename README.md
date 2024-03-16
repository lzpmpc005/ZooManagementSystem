# ZooManagementSystem

Digital zoo management system developed with Django and PostgreSQL
---

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation and Run](#install)
  - [Install Node.js](#node.js)
  - [Install PostgreSQL](#postgreSQL)
  - [Clone the repository and Run](#run)
- [Features](#Features)
- [Contribution](#Contribution)

---

<!-- markdownlint-disable -->

## Introduction[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#introduction)

**ZooManagementSystem**   
This project is a web application for zoo management, developed with Django and use PostgreSQL as a local database server. It has been implemented with the following features:
- manage habitats
- manage staff member
- manage animals
- manage animal routine
- track and log staff activity
- manage tours and feedback
- mamage membership and events


## Requirements[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#requirements)
 
 To perfectly use all the features, you need to install the following dependencies or follow the instructions in Installation and Run.
 ### Django Backend Server
 - asgiref==3.7.2
 - Django==5.0.2
 - django-cors-headers==4.3.1
 - djangorestframework==3.14.0
 - psycopg2==2.9.9
 - pytz==2024.1
 - setuptools==68.2.2
 - sqlparse==0.4.4
 - tzdata==2024.1
 - wheel==0.41.2

 ### React Frontend Server
 - node.js
 - npm install universal-cookie
 - npm install axios
 - npm install react-bootstrap bootstrap

---

## Installation and Run(#install)

### I. Install Node.js (#node.js)

Please refer to   
 https://nodejs.org/en

### II. Install PostgreSQL (#postgreSQL)

Please refer to   
 https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/

Once installed, you can use the respective client tools to connect to the PostgreSQL database.


### III. Clone the repository and Run(#run)

```bash
git clone https://github.com/lzpmpc005/ZooManagementSystem.git
```
#### i. Django Backend Server
1. Navigate to the repository
```bash
cd ZooManagementSystem
```
2. Install dependencies using pip:
```bash
pip install -r requirements.txt
```
3. Navigate to the Project
```bash
cd CyberZooProject
```
4. Configure `CyberZooProject/settings.py` according to you database and email server or create new database according to the configuration:
- Database Server
```python
DATABASES = {
   'default': {
      'ENGINE': 'django.db.backends.postgresql_psycopg2',
      'NAME': 'your_postgresql_database',
      'USER': 'your_postgresql_username',
      'PASSWORD': 'your_postgresql_password',
      'HOST': 'localhost', # modify if yours is different
      'PORT': '5432', # modify if yours is different
   }
}
```

- Email Server
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp-mail.outlook.com'    
# Modify according to your email server
EMAIL_PORT = 587     
# Modify according to your email server
EMAIL_USE_TLS = True 
EMAIL_HOST_USER = 'your email address' 
EMAIL_HOST_PASSWORD = 'your email password' 
```

5. Perform database migration:
```
python manage.py makemigrations
python manage.py migrate
```
6. Run the local server:
```
python manage.py runserver
```

7. Create administration account:
```
python manage.py createsuperuser
```
> [!NOTE]
> Remember this username and password, because some operations can only be perfromed when login as administration.

#### ii. React Frontend Server

1. Navigate to the project
```bash
cd CyberZooFrontend
```
2. Install dependencies using npm:
```bash
 npm install universal-cookie
 npm install axios
 npm install react-bootstrap bootstra
```

3. Start frontend server:
```bash
 npm run dev
```

## Features[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#Features)
1. Normal user can view public contents, sign up, login, logout

2. Manage Staff Member   
(1) Login with administration account   
(2) Click "Add New Staff" button   
(3) Add new staff information and "Submit"   

3. Manage Habitats  
(1) Login with administration account  
(2) Create new habitat  
(3) Edit habitat  
(4) Delete habitat

4. Manage Animals  
(1) Login with administration/Manager account  
(2) Enter the habitat    
(3) Create new animal      
(4) Edit animal    
(5) Delete animal   

> [!NOTE]
> The manager of a habitat can edit the habitat, but can't see the create and delete button.   Normal user can't see the create, edit and delete button.

5. Manage Routine  
(1) Login with administration/Staff account  
(2) Check All Routines    
(3) Check Routine in Animal detail      
(4) Update Routine   

6. Routine Notification   
   (1) Start Notification Module
   ```bash
   python manage.py reminder
   ``` 
   (2) When the system detect an overdue routine, it will send email to the staff and manager (or not, depends on the time passed due)

7. Check Assigned Animals and Tasks  
(1) Login with Staff account   
(2) Check all animals assigned to you in "self" page   
(3) Check assigned Tasks      

8. Report and Prescription  
(1) Report Activity and animal condition   
(2) Take actions according to notification   
(3) Veterinarian can create prescription for an animal when necessary   
(4) Staffs who are responsible for the animal will receive notification and they can update the animal routine accordingly   

9. Check Staff Activities History  
(1) Login with administration/Manager account   
(2) Go to "Self" page   
(3) Admin will see all the activities history   
(4) Manager will see the history in his/her habitat.   

10. Create Map  
(1) Login with administration account   
(2) Create Habitats and Pathways in between   

11. Manage Tour  
(1) Login with administration/TourManager account   
(2) Go to "Tours" page   
(3) Create New Tour following instructions  
(4) Check and Delete existing tours.  

12. Manage Feedback  
(1) Login   
(2) Go to "Tour Details" page   
(3) Create New Feedback   
(4) Check and Delete Feedback  

> [!NOTE]
> Only Admin account can delete feedbacks.

13. Create/Update Membership  
(1) Login with Admin account   
(2) Go to "Membership" page   
(3) Create/Update Membership   

14. Join/Switch/Cancel Membership  
(1) Login with Customer account   
(2) Go to "Membership" page   
(3) Join/Switch/Cancel Membership   
(4) Go to "Profile" page and check personal details    

15. Manage Special Events  
(1)    
(2)    
(3)    
(4)   

> 💡 xxx [xxx] (To be continue). 

---
 ## Contribution
 
If you want to contribute or comment on this project, email lihongtaoix7@gmail.com.