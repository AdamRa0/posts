from flask import Blueprint


post_routes = Blueprint('post_routes', __name__, url_prefix='/api/v1/posts')

@post_routes.route('/')
def placeholder():
    return {'message': 'Placeholder'}, 200