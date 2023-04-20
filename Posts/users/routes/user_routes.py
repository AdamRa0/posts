from ..controllers.account_creation_and_use.create_user import create_new_user

from ..models.data_models.user_model import UserModel
from ..models.request_models.user_signin import UserIn

from flask import Blueprint, jsonify
from flask_pydantic import validate


user_routes = Blueprint('user_routes', __name__, url_prefix='/api/v1/users')


@user_routes.route('/create_user', methods=['POST'])
@validate()
def create_user(body: UserIn):
    create_new_user(body)
    return jsonify({
        'message': 'User created successfully',
        'status': 'Success'
    }), 201


@user_routes.route('/<user_handle>')
def get_user_profile(user_handle: str):
    return jsonify({
        'message': 'Route not defined',
        'status': 'fail'
    }), 500