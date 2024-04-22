from flask import Blueprint, request, jsonify, render_template
from app.models import likes, db, Song, User
from app.forms import AddLikeToSong
from flask_login import login_required, current_user
from sqlalchemy.sql import select, func, text, delete

likes_routes = Blueprint('likes', __name__)
current_likes = Blueprint('current_likes', __name__)

@likes_routes.route('/<int:songId>/likes')
def get_likes(songId):
    song = Song.query.get(songId)

    if song is None:
        return jsonify({"error": "Song not found"}), 404

    likes_data = db.session.query(likes).filter(likes.c.song_id == songId).all()
    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()

    likes_data_send = [{"user_id": user_id, "song_id": song_id} for user_id, song_id in likes_data]
   
    return jsonify({"like_info": likes_data_send,"likeCount": likes_count})

@likes_routes.route('/<int:songId>/likes/add', methods=['POST'])
@login_required
def add_song_like(songId):
    current_user_id = current_user.id
    song = Song.query.get(songId)

    if song is None:
        return jsonify({"error": "Song not found"}), 404

    like = likes.insert().values(user_id=current_user_id, song_id=songId)
    db.session.execute(like)
    db.session.commit()

    like_data = db.session.query(likes).filter(likes.c.song_id == songId).all()
    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    likes_data_send = [{"user_id": user_id, "song_id": song_id} for user_id, song_id in like_data]
   
    return jsonify({"like_info": likes_data_send,"likeCount": likes_count})
@likes_routes.route('/<int:songId>/likes/delete',methods=['DELETE'])
@login_required
def delete_song_like(songId):
    song = Song.query.get(songId)

    if song is None:
        return jsonify("Song not found"), 404
    
    # like_to_delete = db.session.query(likes).filter(likes.c.song_id == songId, likes.c.user_id == current_user.id).first()
    # if not like_to_delete:
    #     return jsonify({"Error no like found"}), 404
    

    delete_sql = delete(likes).where(likes.c.user_id == current_user.id, likes.c.song_id == songId)


    result = db.session.execute(delete_sql)
    if result.rowcount == 0:
        return jsonify({"error":"No Like Found"}), 404
    
    db.session.commit()
    like_data = db.session.query(likes).filter(likes.c.song_id == songId).all()

    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    likes_data_send = [{"user_id": user_id, "song_id": song_id} for user_id, song_id in like_data]
    print(like_data, likes_count)
   
    return jsonify({"like_info": likes_data_send,"likeCount": likes_count})

@current_likes.route('/current', methods=['GET'])
@login_required
def get_user_likes():
    current_user_id = current_user.id
    query = select([likes.c.song_id]).where(likes.c.user_id == current_user_id)
    result = db.engine.execute(query)
    song_ids = [row[0] for row in result]

    return jsonify(song_ids)