from ..models.user_model import UserModel
from ..controllers.account_misc.create_users import create_user_controller

def create_user_view(req_body: UserModel) -> None:
    create_user_controller(req_body)