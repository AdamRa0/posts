from ..controllers.create_post import create_post
from ..controllers.delete_post import delete_post
from ..controllers.get_post import get_post, get_post_by_author_id
from ..controllers.get_posts import get_posts, get_posts_by_user
from ..controllers.like_dislike_post import like_post, dislike_post
from ..controllers.repost_derepost import repost, del_repost
from ..controllers.update_post import update_post

from ..models.post_schema import PostSchema
from ..models.post_creation_model import PostCreationModel
from ..models.post_update_model import PostUpdateModel

from flask import Blueprint, jsonify, request
from flask_pydantic import validate


post_routes = Blueprint('post_routes', __name__, url_prefix='/api/v1/posts')
post_schema = PostSchema()
posts_schema = PostSchema(many=True)


@post_routes.route('/')
def get_all_posts():
    posts = get_posts()

    return posts_schema.dump(posts), 200


@post_routes.route('/create_post', methods=['POST'])
@validate()
def create_new_post(body: PostCreationModel):
    create_post(body)

    author_posts = get_post_by_author_id(body.author_id)

    return posts_schema.dump(author_posts)[0], 201


@post_routes.route('/<post_id>')
def get_single_post(post_id: str):
    post = get_post(post_id)

    return post_schema.dump(post), 200


@post_routes.route('/user_posts/<user_id>')
def get_user_posts(user_id: str):
    user_posts = get_posts_by_user(user_id)
    
    return posts_schema.dump(user_posts), 200


@post_routes.route('/update_post', methods=['PATCH'])
@validate()
def patch_post(body: PostUpdateModel):
    updated_post = update_post(body)

    return post_schema.dump(updated_post), 200


@post_routes.route('/<post_id>/approve', methods=['PATCH'])
def approve_post(post_id: str):
    like_post(post_id)

    return jsonify({
        'status': 'success'
    }), 200


@post_routes.route('/<post_id>/disapprove', methods=['PATCH'])
def disapprove_post(post_id: str):
    dislike_post(post_id)

    return jsonify({
        'status': 'success'
    }), 200


@post_routes.route('/<post_id>', methods=['DELETE'])
def delete_user_post(post_id: str):
    delete_post(post_id)

    return jsonify({}), 204


@post_routes.route('/<post_id>/repost', methods=['PATCH'])
def repost_post(post_id: str):
    user_id = request.json.get('user_id')

    repost(post_id, user_id)

    return jsonify({'status': 'success'}), 200


@post_routes.route('/<post_id>/remove-repost', methods=['PATCH'])
def remove_repost(post_id: str):
    user_id = request.json.get('user_id')

    del_repost(post_id, user_id)

    return jsonify({'status': 'success'}), 200