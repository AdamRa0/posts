from ..controllers.create_post import create_post
from ..controllers.delete_post import delete_post
from ..controllers.get_post import get_post, get_post_by_author_id
from ..controllers.get_posts import get_posts, get_posts_by_user
from ..controllers.like_dislike_post import like_post, dislike_post

from ..controllers.repost_derepost import repost, del_repost
from ..controllers.update_post import update_post
from ..controllers.post_comment import post_comment
from ..models.post_schema import PostSchema
from ..models.post_creation_model import PostCreationModel
from ..models.post_update_model import PostUpdateModel

from ...utils.show_true_path import show_true_path
from ...utils.streams.format_sse import format_sse
from ...utils.upload_file import upload_file

from ...follow.controllers.get_sub_subees import get_subscribers

from Posts.announcer import announcer

from flask import Blueprint, jsonify, request, current_app
from flask_pydantic import validate
from flask_jwt_extended import jwt_required, current_user


post_routes = Blueprint("post_routes", __name__, url_prefix="/api/v1/posts")
post_schema = PostSchema()
posts_schema = PostSchema(many=True)


@post_routes.route("/")
def get_all_posts():
    """
    First route a new visitor will see.
    Will contain all posts sorted by popularity (ratio of approvals to disapprovals)
    """
    page_number = int(request.args.get("page"))

    posts_schema = PostSchema(many=True)
    posts = get_posts(page=page_number)

    return posts_schema.dump(posts), 200


@post_routes.route("/create_post", methods=["POST"])
@jwt_required()
def create_new_post():
    body = request.form.get("body")

    if request.files:
        uploaded_file = upload_file()
    else:
        uploaded_file = None

    create_post(
        PostCreationModel(body=body, author_id=current_user.id, post_file=uploaded_file)
    )

    author_posts = get_post_by_author_id(current_user.id)

    # TODO: Revist when you get SSE's working
    # msg = format_sse(data=posts_schema.dump(author_posts)[0], event="new-post")
    # announcer.announce(msg)

    return posts_schema.dump(author_posts)[0], 201


@post_routes.route("/<post_id>")
def get_single_post(post_id: str):
    post = get_post(post_id)

    author_subscribers = get_subscribers(post.author_id)
    author = post.author

    if author.is_private and current_user not in author_subscribers:
        return jsonify({"message": "User limits who can view their posts."}), 403

    return post_schema.dump(post), 200


@post_routes.route("/user-posts")
def get_user_posts():
    user_id = request.args.get("user-id")
    page = int(request.args.get("page"))

    user_posts = get_posts_by_user(user_id, page)

    return posts_schema.dump(user_posts), 200


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
    else:
        file = None

    comment = PostCreationModel(
        body=request.form.get("body"), author_id=current_user.id, post_file=file
    )

    post_comment(post_id, comment)

    return jsonify({"status": "success"}), 201
