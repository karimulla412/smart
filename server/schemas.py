
from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel


# ----------- USER SCHEMAS -----------

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

# ----------- TASK SCHEMAS -----------
class TaskSummary(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completed_percentage: float


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[bool] = False
    category: Optional[str] = "general"
    due_date: Optional[date] = None
    position: Optional[int] = 0

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[bool] = None
    category: Optional[str] = None
    due_date: Optional[date] = None
    position: Optional[int] = None

class Task(TaskBase):
    id: int
    owner_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True
