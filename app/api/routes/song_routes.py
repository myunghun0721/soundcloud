from flask import Blueprint, jsonify, request
from app.models import Song, db, Playlist, User
from ...forms import song_form
from flask_login import current_user, login_required

song_routes = Blueprint('songs', __name__)

@song_routes('/')
def song_index():
    return "hello"
