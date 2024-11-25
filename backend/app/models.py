from pydantic import BaseModel, EmailStr, validator
from datetime import datetime
from typing import Optional
import pytz

class BlogPost(BaseModel):
    id: Optional[int] = None  # Auto-incremented by the database
    img: str
    created_at: datetime = None
    category: str
    title: str
    description: str
    user_name: str
    user_email: EmailStr
    user_image: str

    # @validator('created_at', pre=True, always=True)
    # def validate_created_at(cls, v):
    #     if v is None:
    #         # If created_at is None, set it to the current UTC time
    #         return datetime.now(pytz.UTC)
    #     # Ensure the datetime is timezone-aware
    #     if v.tzinfo is None:
    #         raise ValueError("created_at must have timezone information")
    #     return v
