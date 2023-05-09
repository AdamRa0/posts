from ..controllers.create_post import create_post
from ..controllers.delete_post import delete_post
from ..controllers.get_post import get_post, get_post_by_author_id
from ..controllers.get_posts import get_posts_by_user
from ..controllers.like_dislike_post import like_post, dislike_post

from ..controllers.repost_derepost import repost, del_repost
from ..controllers.update_post import update_post
from ..controllers.post_comment import post_comment
from ..models.post_schema import PostSchema
from ..models.post_creation_model import PostCreationModel
from ..models.post_update_model import PostUpdateModel

from ...utils.show_true_path import show_true_path
from ...utils.upload_file import upload_file

from flask import Blueprint, jsonify, request, current_app
from flask_pydantic import validate
from flask_jwt_extended import jwt_required, current_user


post_routes = Blueprint("post_routes", __name__, url_prefix="/api/v1/posts")
post_schema = PostSchema()
posts_schema = PostSchema(many=True)


@post_routes.route("/create_post", methods=["POST"])
@jwt_required()
def create_new_post():
    body = request.form.get("body")

    if request.files:
        uploaded_file = upload_file()

    create_post(
        PostCreationModel(body=body, author_id=current_user.id, post_file=uploaded_file)
    )

    author_posts = get_post_by_author_id(current_user.id)

    updated_posts = []

    for post in author_posts:
        if post.post_file is not None:
            post.post_file = show_true_path(post.post_file)

        updated_posts.append(post)

    return posts_schema.dump(updated_posts)[0], 201


@post_routes.route("/<post_id>")
def get_single_post(post_id: str):
    post = get_post(post_id)

    post.post_file = show_true_path(post.post_file)

    return post_schema.dump(post), 200


@post_routes.route("/user_posts/<user_id>")
def get_user_posts(user_id: str):
    user_posts = get_posts_by_user(user_id)

    updated_user_posts = []

    for post in user_posts:
        post.post_file = show_true_path(post.post_file)

        updated_user_posts.append(post)

    return posts_schema.dump(updated_user_posts), 200


@post_routes.route("/update_post", methods=["PATCH"])
@jwt_required()
@validate()
def patch_post(body: PostUpdateModel):
    updated_post = update_post(body)

    return post_schema.dump(updated_post), 200


@post_routes.route("/<post_id>/approve", methods=["PATCH"])
@jwt_required()
def approve_post(post_id: str):
    like_post(post_id)

    return jsonify({"status": "success"}), 200


@post_routes.route("/<post_id>/disapprove", methods=["PATCH"])
@jwt_required()
def disapprove_post(post_id: str):
    dislike_post(post_id)

    return jsonify({"status": "success"}), 200


@post_routes.route("/<post_id>", methods=["DELETE"])
@jwt_required()
def delete_user_post(post_id: str):
    delete_post(current_app, post_id)

    return jsonify({}), 204


@post_routes.route("/<post_id>/repost", methods=["PATCH"])
@jwt_required()
def repost_post(post_id: str):
    repost(post_id, current_user.id)

    return jsonify({"status": "success"}), 200


@post_routes.route("/<post_id>/remove-repost", methods=["PATCH"])
@jwt_required()
def remove_repost(post_id: str):
    del_repost(post_id, current_user.id)

    return jsonify({"status": "success"}), 200


@post_routes.route("/<post_id>/create-comment", methods=["POST"])
@jwt_required()
def comment_on_post(post_id: str):
    if request.files:
        file = upload_file()

    comment = PostCreationModel(
        body=request.form.get("body"), author_id=current_user.id, post_file=file
    )

    post_comment(post_id, comment)

    return jsonify({"status": "success"}), 200
