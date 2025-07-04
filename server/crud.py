
from sqlalchemy.orm import Session
import models, schemas

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_task(db: Session, task: schemas.TaskCreate, user_id: int):
    db_task = models.Task(**task.dict(), owner_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_tasks(db: Session, user_id: int):
    return db.query(models.Task).filter(models.Task.owner_id == user_id).all()

def get_task_by_id(db: Session, task_id: int, user_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == user_id).first()

def get_tasks_by_category(db: Session, user_id: int, category: str):
    return db.query(models.Task).filter(models.Task.owner_id == user_id, models.Task.category == category).all()

def get_tasks_by_status(db: Session, user_id: int, status: bool):
    return db.query(models.Task).filter(models.Task.owner_id == user_id, models.Task.status == status).all()

def get_tasks_by_priority(db: Session, user_id: int, priority: str):
    return db.query(models.Task).filter(models.Task.owner_id == user_id, models.Task.priority == priority).all()

def update_task(db: Session, task_id: int, task_data: schemas.TaskUpdate, user_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == user_id).first()
    if not task:
        return None

    update_data = task_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task_id: int, user_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id, models.Task.owner_id == user_id).first()
    if not task:
        return False
    db.delete(task)
    db.commit()
    return True
