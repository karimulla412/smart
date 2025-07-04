# Smart Task Tracker

## Project Overview
Smart Task Tracker is a web application designed to help users efficiently manage their daily tasks. It allows users to create, edit, delete, and categorize tasks, mark them as complete, and view summary statistics on task completion. The app also supports user authentication for personalized task management.

---

## Features

- User registration and login with JWT-based authentication  
- Create new tasks with title, description, category, priority, and due date  
- Edit and delete existing tasks  
- Mark tasks as complete or incomplete  
- Filter tasks by category, status, and priority  
- View a summary dashboard showing percentage of tasks completed  
- Responsive UI built with ReactJS for smooth user experience  
- Backend API built using FastAPI with PostgreSQL database  
- Automatic priority suggestion based on task details (optional AI-based)  

---

## Technologies Used

- **Frontend:** ReactJS, CSS  
- **Backend:** Python FastAPI  
- **Database:** PostgreSQL  
- **Authentication:** JWT (JSON Web Tokens)  
- **Tools:** Git, npm, Uvicorn, SQLAlchemy  

---

## Getting Started

### Prerequisites

- Node.js and npm installed  
- Python 3.8+ installed  
- PostgreSQL database setup  

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smart-task-tracker.git
   cd smart-task-tracker
Setup Backend

Navigate to backend directory (e.g., server)

Create and activate a virtual environment

Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Configure database connection in .env or config files

Run database migrations if any

Start the backend server:

bash
Copy
Edit
uvicorn main:app --reload
Setup Frontend

Navigate to frontend directory (e.g., frontend)

Install dependencies:

bash
Copy
Edit
npm install
Start the React app:

bash
Copy
Edit
npm start
