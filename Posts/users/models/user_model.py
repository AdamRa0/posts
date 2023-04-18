from uuid import uuid4
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
    img_url: Path to image. Currently a file path. Update to http path later on.
    banner_image_url: Path to banner img. Currently a file path. Update to http path later on.
    """
    id: UUID4 = uuid4()
    email: EmailStr
    username: str
    handle: str
    password: str
    bio: str | None = None
    img_url: FileUrl | None = None
    banner_img_url: FileUrl | None = None