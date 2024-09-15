
## Employee Management System (EMS)

This project is an Employee Management System (EMS) with a Django backend and a React frontend. It supports employee management features including add new employee, edit employee data, delete employee data and search employee.

## Project Structure

EMS Backend/

- manage.py
- requirements.txt
- EMSBackend/  [# Django project settings and configurations]
- employees/   [# Django app for managing employee ]
- static/      [# Static files]

EMS Frontend/
- public/       [# Public assets]
- src/          [# Source code (React components)]
- package.json  [# Node.js dependencies]
- .env          [# Environment variables]


## Features

- Employee Management: Create, read, update, and delete employee data.
- Search and Filter: Search employees by name, email, date of birth, and mobile number.
- Pagination and Sorting: Supports sorting employee data and pagination.
- File Uploads: Employees' profile pictures or documents can be uploaded and handled securely.
- Responsive Design: The frontend is designed to work on various screen sizes.

## Requirements
- Backend (Django)
  - Python 3.x
  - Django 4.x
  - Django REST Framework
- Frontend (React)
  - Node.js
  - React
  - Bootstrap 5


# Project Setup

### Backend Setup (Django)

Install Python version 3.11.4 and ensure PIP is installed.

Create a virtual environment:

```bash
  python -m venv myenv
```
Activate the virtual environment: 

```bash
  myenv\Scripts\activate
```

Clone The Project: 

```bash
  git clone https://github.com/your-username/employee-management-system.git

```

Navigate to the project directory: 

```bash
  cd EMS Backend
  cd EMSBacked
```
Install dependencies:
```bash
  pip install -r requirement.txt
```

Run migrations and start the Django development server:
```bash
  python manage.py migrate
  python manage.py runserver
```

### Frontend (React)

Navigate to the frontend directory:

```bash
  cd EMS Frontend
```
Install dependencies:

```bash
  npm install
```

npm install 

```bash
npm start
```
## Uses
- Access the Django API at http://localhost:8000/
- The React frontend can be accessed at http://localhost:3000/


## API Reference

#### Fetch all employees.

```http
  GET api/employees/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Optional**. Filter employees by name (partial match). |
| `email`      | `string` | **Optional**. Filter employees by email (partial match). |
| `birthday`      | `string` | **Optional**. Filter employees by date of birth (exact match). |
| `phone`      | `string` | **Optional**. Filter employees by mobile number (exact match). |
| `sort_by`      | `string` | **Optional**. Field to sort employees by (e.g., name, birthday). |
| `order_by`      | `string` | **Optional**. Order of sorting, asc (default) or desc. |
| `limit`      | `int` | **Optional**. FNumber of items per page (default: 5). |


#### Responses
- 200 OK: Returns a paginated list of employees.
- 204 No Content: No employees found matching the filters.
- 400 Bad Request: Invalid limit parameter

#### Get Employee Detail

```http
  GET api/employee/<int:pk>/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pk`      | `int` | **Required**. ID of employee. |

#### Responses
- 200 OK: Returns the details of the employee.
- 404 Not Found: Employee with the specified ID does not exist.


#### Create New Employee

```http
  POST api/employee/
```
#### Request Body
- Content-Type: application/json
- Schema: Employee data (e.g., name, email, birthday, mobile).
#### Responses
- 201 Created: Employee created successfully with the returned data.
- 406 Not Acceptable: Invalid data provided.


#### Update Employee
```http
  PUT api/employee/<int:pk>/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pk`      | `int` | **Required**. ID of employee. |

#### Request Body
- Content-Type: application/json
- Schema: Updated employee data (e.g., name, email, birthday, mobile).

#### Responses
- 200 OK: Returns the details of the employee.
- 404 Not Found: Employee with the specified ID does not exist.

#### Delete Employee
```http
  PUT api/employee/<int:pk>/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pk`      | `int` | **Required**. ID of employee. |

#### Responses
- 204 No Content: Employee deleted successfully.
- 404 Not Found: Employee with the specified ID does not exist.

## Demo

https://drive.google.com/file/d/1lZ1iFXTCdMVsqAqswaY-xAJDzPYlenIb/view?usp=sharing
