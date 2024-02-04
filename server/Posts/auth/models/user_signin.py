from pydantic import BaseModel, EmailStr


class UserSignIn(BaseModel):
    email_address: EmailStr
    password: str
