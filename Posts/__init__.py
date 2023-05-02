import os
from .users.routes.user_routes import user_routes
from .posts_.routes.post_routes import post_routes
from .posts_.controllers.get_posts import get_posts
from .posts_.models.post_schema import PostSchema
from .auth.routes.auth_routes import auth_routes
from .database.db import create_tables, init_app

from flask import Flask


def create_app():
    """
    Creates and returns an instance of our application
    """

    app: Flask = Flask(__name__, instance_relative_config=True)
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config.from_pyfile('config.py', silent=True)

    init_app(app)

    # Create table if not exists before first request to app
    app.before_first_request(create_tables)

    app.register_blueprint(user_routes)
    app.register_blueprint(post_routes)
    app.register_blueprint(auth_routes)

    @app.route('/')
    def get_all_posts():
        posts_schema = PostSchema(many=True)
        posts = get_posts()

        return posts_schema.dump(posts), 200

    return app