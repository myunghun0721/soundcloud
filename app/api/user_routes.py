from flask import Blueprint, jsonify # type: ignore
from flask_login import login_required, current_user # type: ignore
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/current')
@login_required
def user():
    """
    Query for a user by id and returns that user in a dictionary.
    If no user is found, returns a JSON error message.
    """
    user = User.query.filter(User.id == current_user.id).first()
    if user:
        return user.to_dict()
    else:
        return jsonify({"error": "User not found"}), 404
