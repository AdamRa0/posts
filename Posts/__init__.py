import os
from datetime import datetime, timezone, timedelta

from .users.routes.user_routes import user_routes
from .posts_.routes.post_routes import post_routes
from .posts_.controllers.get_posts import get_posts
from .posts_.models.post_schema import PostSchema
from .auth.routes.auth_routes import auth_routes
from .database.db import create_tables, init_app

from flask import Flask
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    create_access_token,
    set_access_cookies,
)


def create_app():
    """
    Creates and returns an instance of our application
    """

    app: Flask = Flask(__name__)

    init_app(app)

    create_tables(app)

    app.register_blueprint(user_routes)
    app.register_blueprint(post_routes)
    app.register_blueprint(auth_routes)

    @app.route("/")
    def get_all_posts():
        """
        First route a new visitor will see.
        Will contain all posts sorted by popularity (ratio of approvals to disapprovals)
        """
        posts_schema = PostSchema(many=True)
        posts = get_posts()

        return posts_schema.dump(posts), 200

    @app.after_request
    def refresh_expiring_tokens(response):
        """
        Refreshes any token that is within 15 minutes of expiring
        """
        try:
            expiring_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestatmp = datetime.timestamp(now + timedelta(minutes=15))

            if target_timestatmp > expiring_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            return response

    return app
