from ..views.create_user import create_user_view
from ..views.get_user import get_user
from ..models.user_model import UserModel
from ..models.user_created_response_model import UserCreatedResponseModel

from flask import Blueprint, jsonify
from flask_pydantic import validate

user_routes = Blueprint('user_routes', __name__, url_prefix='/api/v1/users')

@user_routes.route('/create_user', methods=['POST'])
@validate()
def create_user(body: UserModel):
    create_user_view(body)
    return jsonify({
        'status': 'success',
        'message': 'User created'
    }), 201

@user_routes.route('/<user_handle>')
def get_user_profile(user_handle: str):
    user = get_user('handle', user_handle)

    if user is not None:
        return jsonify({
            'status': 'success',
            'message': 'User got'
        }), 200
    
    return jsonify({
        'status': 'Not found',
        'message': 'User not found'
    }), 404