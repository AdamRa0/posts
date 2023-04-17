from pydantic import UUID4, FilePath, BaseModel

class UserCreatedResponseModel(BaseModel):
    """
    Response data model after user creates account.

    Attributes
    ----------
    id: User id.
    username: User username.
    handle: User account handle.
    bio: User account bio.
    followers: Amount of users following account owner.
    following: Amount of users followed by account owner.
    img_url: Path to image. Currently a file path. Update to http path later on.
    banner_image_url: Path to banner img. Currently a file path. Update to http path later on.
    is_active: Shows whether an account is active or not.
    date_created: Shows date account was created.
    """
    id: UUID4
    username: str
    handle: str
    bio: str
    followers: int
    following: int
    img_url: FilePath = None
    banner_img_url: FilePath = None
    is_active: bool
    date_created: str