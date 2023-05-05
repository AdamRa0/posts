from pydantic import BaseModel, UUID4


class PostCreationModel(BaseModel):
    body: str
    author_id: UUID4
