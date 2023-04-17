import uuid
from pydantic import UUID4, EmailStr, FileUrl, BaseModel

class UserModel(BaseModel):
    """
    Default user model

    Attributes
    ----------
    id: User id.
    email: User email address.
    username: User username.
    handle: User account handle.
    password: User account password.
    bio: User account bio.
    followers: Amount of users following account owner.
    following: Amount of users followed by account owner.
    img_url: Path to image. Currently a file path. Update to http path later on.
    banner_image_url: Path to banner img. Currently a file path. Update to http path later on.
    is_active: Shows whether an account is active or not.
    date_created: Shows date account was created.
    """
    id: UUID4 = uuid.uuid4()
    email: EmailStr
    username: str
    handle: str
    password: str
    bio: str
    followers: int
    following: int
    img_url: FileUrl = None
    banner_img_url: FileUrl = None
    is_active: bool
    date_created: str