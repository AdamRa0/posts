from flask import Blueprint

user_routes = Blueprint('user', __name__, url_prefix='/user')

@user_routes.route('')
def add_user():
    pass