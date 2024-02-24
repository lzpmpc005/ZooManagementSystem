# ZooManagementSystem

Digital zoo management system developed with Django and PostgreSQL
---

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation and Run](#install)
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


## Requirements[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#requirements)
 
 To perfectly use all the features, you need to install the following dependencies or follow the instructions in Installation and Run.

- asgiref==3.7.2
- Django==5.0.2
- psycopg2==2.9.9
- setuptools==68.2.2
- sqlparse==0.4.4
- tzdata==2024.1
- wheel==0.41.2

---

## Installation and Run(#install)

### I. Install PostgreSQL (#postgreSQL)

Please refer to   
 https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/

Once installed, you can use the respective client tools to connect to the PostgreSQL database.


### II. Clone the repository and Run(#run)

```bash
git clone https://github.com/lzpmpc005/ZooManagementSystem.git
```

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

> [!NOTE]
> The manager of a habitat can edit the habitat, but can't see the create and delete button.   Normal user can't see the create, edit and delete button.

> 💡 xxx [xxx] (To be continue). 

---
 ## Contribution
 
If you want to contribute or comment on this project, email lihongtaoix7@gmail.com.