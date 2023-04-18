from uuid import uuid4
from pydantic import UUID4, FilePath, BaseModel

class UserCreatedResponseModel(BaseModel):
    """
    Response data model after user creates account.

    Attributes
    ----------
    id: User id. Remember to add this attribute after creation of client.
    username: User username.
    handle: User account handle.
    bio: User account bio.
    img_url: Path to image. Currently a file path. Update to http path later on.
    banner_image_url: Path to banner img. Currently a file path. Update to http path later on.
    """
    id: UUID4 = uuid4()
    username: str
    handle: str
    bio: str | None = None
    img_url: FilePath | None = None
    banner_img_url: FilePath | None = None