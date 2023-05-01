from pydantic import BaseModel, EmailStr

class UserSignUp(BaseModel):
    username: str
    email_address: EmailStr
    handle: str
    password: str