# Smart Task Tracker

A task management web application built with **ReactJS** for the frontend, **FastAPI** for the backend, and **PostgreSQL** as the database.  
The app allows users to create, update, delete, categorize, and track the status of their tasks.

---

## 🚀 Features

- User registration and login with JWT authentication
- Create new tasks with title, description, category, priority, and due date
- Edit and delete existing tasks
- Mark tasks as completed or pending
- Filter tasks by category and status
- View summary of task completion rates
- Responsive UI design for desktop and mobile
- Secure API endpoints with authentication

---

## 🛠️ Setup Instructions

### Backend (FastAPI)

1. Navigate to the backend folder:
   ```bash
   cd server
Create and activate a virtual environment:

bash
Copy
Edit
python -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Create a .env file with the following variables:

ini
Copy
Edit
DATABASE_URL=postgresql://username:password@localhost/dbname
SECRET_KEY=your_jwt_secret_key
Run the backend server:

bash
Copy
Edit
uvicorn main:app --reload
Frontend (ReactJS)
Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the frontend app:

bash
Copy
Edit
npm start
The app will open in your browser at http://localhost:3000

📝 API Endpoints Overview
POST /signup – Register a new user

POST /token – User login, returns JWT token

GET /tasks – List tasks for the authenticated user

POST /tasks – Create a new task

PUT /tasks/{id} – Update a task

DELETE /tasks/{id} – Delete a task

GET /tasks/by-category/{category} – Filter tasks by category

GET /tasks/by-status/{status} – Filter tasks by completion status

GET /tasks/summary – Get summary statistics on tasks
