from ..models.user_model import UserModel
from ..models.user_created_response_model import UserCreatedResponseModel

from flask import Blueprint, jsonify
from flask_pydantic import validate

user_routes = Blueprint('user_routes', __name__, url_prefix='/api/v1/users')

@user_routes.route('/create_user', methods=['POST'])
@validate()
def create_user(body: UserModel):
    pass

@user_routes.route('/<user_handle>')
def get_user_profile(user_handle: str):
    pass