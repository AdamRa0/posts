from pydantic import BaseModel, UUID4

class PostUpdateModel(BaseModel):
    id: UUID4
    body: str