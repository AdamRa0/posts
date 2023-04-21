from pydantic import BaseModel, EmailStr

class UserOut(BaseModel):
    username: str
    email_address: EmailStr
    handle: str