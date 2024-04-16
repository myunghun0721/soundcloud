from flask import Blueprint, request, jsonify, render_template
from app.models import likes, db, Song, User
from app.forms import AddLikeToSong
from flask_login import login_required, current_user
from sqlalchemy.sql import select, func, text, delete

likes_routes = Blueprint('likes', __name__)
current_likes = Blueprint('current_likes', __name__)

@likes_routes.route('/likes')
def get_likes(songId):
    song = Song.query.get(songId)

    if song is None:
        return jsonify({"error": "Song not found"}), 404

    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    return jsonify(likes_count)

@likes_routes.route('/likes/add', methods=['GET','POST'])
@login_required
def add_song_like(songId):
    current_user_id = current_user.id
    song = Song.query.get(songId)

    if song is None:
        return jsonify({"error": "Song not found"}), 404

    like = likes.insert().values(user_id=current_user_id, song_id=songId)
    db.session.execute(like)
    db.session.commit()

    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    return jsonify(likes_count)

@likes_routes.route('/likes/delete',methods=['GET','POST'])
@login_required
def delete_song_like(songId):
    song = Song.query.get(songId)

    if song is None:
        return jsonify("Song not found"), 404

    delete_sql = delete(likes).where(likes.c.user_id == current_user.id, likes.c.song_id == songId)
    db.session.execute(delete_sql)
    db.session.commit()

    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    return jsonify({likes_count})


@current_likes.route('/current', methods=['GET'])
@login_required
def get_user_likes():
    current_user_id = current_user.id
    query = select([likes.c.song_id]).where(likes.c.user_id == current_user_id)
    result = db.engine.execute(query)
    song_ids = [row[0] for row in result]

    return jsonify(song_ids)
