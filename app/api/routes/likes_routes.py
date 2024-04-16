from flask import Blueprint, request, jsonify, render_template
from app.models import likes, db, Song, User
from app.forms import AddLikeToSong
from flask_login import login_required, current_user
from sqlalchemy.sql import select, func, text

likes_routes = Blueprint('likes', __name__)

@likes_routes.route('/likes')
def get_likes(songId):

    song = Song.query.get(songId)

    if song is None:
        return jsonify("song can't be found"), 404

    likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
    return jsonify(likes_count)

@likes_routes.route('/likes/add', methods=['GET','POST'])
@login_required
def add_song_like(songId):
    current_user_id = current_user.id
    form = AddLikeToSong()

    song = Song.query.get(songId)

    if song is None:
        return jsonify("song can't be found"), 404


    if request.method=="GET":
        print("add a like!")
        return render_template("add_like.html", form=form, songId=songId)

    elif request.method=="POST":
        user_like = db.session.query(likes).filter(likes.c.user_id == current_user_id).count()

        if user_like >1:
            db.session.execute(text("DELETE FROM likes WHERE song_id=:songId AND user_id=:current_user_id"), {'songId': songId, 'current_user_id': current_user_id})
            db.session.commit()
            print("user like has been removed")
        else:
            like = likes.insert().values(user_id = current_user_id, song_id = songId)
            db.session.execute(like)
            db.session.commit()
            likes_count = db.session.query(likes).filter(likes.c.song_id == songId).count()
            return jsonify(likes_count)


    return render_template("add_like.html", form=form, songId=songId)
