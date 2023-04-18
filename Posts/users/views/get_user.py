from ..models.user_created_response_model import UserCreatedResponseModel
from ..controllers.account_misc.get_user import get_user

def get_user_view(column: str, validator: str) -> UserCreatedResponseModel:
    return get_user(column, validator)

