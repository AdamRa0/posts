from pydantic import BaseModel, EmailStr

class UserIn(BaseModel):
    username: str
    email_address: EmailStr
    handle: str
    password: str