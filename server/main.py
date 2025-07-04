
from fastapi import FastAPI, Depends, HTTPException, status,Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth, database
import schemas
#rom sqlalchemy.orm import Session
from typing import Any
from schemas import TaskSummary

models.Base.metadata.create_all(bind=database.engine)
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()
origins = [
    "http://localhost:3000",  # React frontend origin
    # add other allowed origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods: GET, POST, OPTIONS, etc.
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Signup route
@app.post("/signup", response_model=schemas.UserOut)
def signup(user_create: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_create.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user_create.password)
    new_user = models.User(username=user_create.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Token (login) route
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Create task
"""@app.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_task = models.Task(**task.dict(), owner_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task"""
@app.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    task_data = task.dict()

    # If priority is missing or None, suggest it based on title/description
    if not task_data.get("priority"):
        task_data["priority"] = suggest_priority(task_data["title"], task_data.get("description"))

    db_task = models.Task(**task_data, owner_id=current_user.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# Get all tasks of current user
@app.get("/tasks/", response_model=List[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    tasks = db.query(models.Task).filter(models.Task.owner_id == current_user.id).offset(skip).limit(limit).all()
    return tasks

# Get tasks by category and status
@app.get("/tasks/by-category/{category}", response_model=List[schemas.Task])
def get_tasks_by_category(category: str, db: Session = Depends(get_db)):
    tasks = db.query(models.Task).filter(models.Task.category == category).all()
    if not tasks:
        raise HTTPException(status_code=404, detail=f"No tasks found in category '{category}'")
    return tasks

@app.get("/tasks/by-status/{status}", response_model=List[schemas.Task])
def get_tasks_by_status(status: bool, db: Session = Depends(get_db)):
    tasks = db.query(models.Task).filter(models.Task.status == status).all()
    if not tasks:
        raise HTTPException(status_code=404, detail=f"No tasks found with status '{status}'")
    return tasks

# Get task by id for current user
@app.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# Update task by id for current user
@app.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

# Delete task by id for current user
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}


# Task summary endpoint

@app.get("/tasks-summary", response_model=TaskSummary)
def get_tasks_summary(db: Session = Depends(get_db)):
    total_tasks = db.query(models.Task).count()
    completed_tasks = db.query(models.Task).filter(models.Task.status == True).count()
    pending_tasks = db.query(models.Task).filter(models.Task.status == False).count()
    completed_percentage = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0.0

    return TaskSummary(
        total_tasks=total_tasks,
        completed_tasks=completed_tasks,
        pending_tasks=pending_tasks,
        completed_percentage=round(completed_percentage, 2)
    )


# Function to suggest task priority based on title keywords
def suggest_priority(title: str, description: str | None = None) -> str:
    text = (title + " " + (description or "")).lower()
    if any(word in text for word in ["urgent", "immediately", "asap", "important", "critical"]):
        return "high"
    elif any(word in text for word in ["soon", "normal", "medium", "standard"]):
        return "medium"
    else:
        return "low"


@app.post("/reset-password")
def reset_password(
    username: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_password = auth.get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.commit()
    return {"detail": "Password reset successful"}
