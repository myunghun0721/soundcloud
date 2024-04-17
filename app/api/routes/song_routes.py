from flask import Blueprint, jsonify, request
from app.models import Song, db, Playlist, User
from ...forms import AddSongForm
from flask_login import current_user, login_required
from datetime import datetime

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def song_index():
    songs = Song.query.all()
    print(songs)
    # for song in songs:
    return [song.to_dict() for song in songs]

@song_routes.route('/', methods=['POST'])
@login_required
def post_song():
    form = AddSongForm()

    form['csrf_token'].data =request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            'title' : form.data['title'],
            'artist' : form.data['artist'],
            'album' : form.data['album'],
            'release_date' : form.data['release_date'],
            'genre' : form.data['genre'],
            'user_id': current_user.id,
            'preview_img' : form.data['preview_img'],
            'song_url': form.data['song_url']
        }

        new_song = Song(**params)
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()

    return {"message": "validation failed"}

@song_routes.route('/<int:songId>', methods=['DELETE'])
@login_required
def delete_song(songId):
    song = Song.query.get(songId)

    if not song:
        return {"message": "song not found"}

    if current_user != song.user_id:
        return {"message": "your nott he owner of this song", "current_user": current_user.id, "song_owner": song.user_id}

    db.session.delete(song)
    db.session.commit()

    return {"message": "delete successful"}



@song_routes.route('/<int:songId>', methods=['PUT'])
@login_required
def edit_song(songId):
    song = Song.query.get(songId)

    if not song:
        return {"message": "song not found"}

    if current_user != song.user_id:
        return {"message": "your nott he owner of this song", "current_user": current_user.id, "song_owner": song.user_id}


    form = AddSongForm()

    form['csrf_token'].data =request.cookies['csrf_token']

    if form.validate_on_submit():

        song.title = form.data['title']
        song.artist = form.data['artist']
        song.album = form.data['album']
        song.release_date = form.data['release_date']
        song.genre = form.data['genre']
        song.preview_img = form.data['preview_img']
        song.song_url= form.data['song_url']


        db.session.commit()
        return song.to_dict()
    return {"message": "validation failed"}

@song_routes.route('/<int:songId>')
def get_song_details(songId):
    song = Song.query.get(songId)

    if not song:
        return {"message": "song not found"}, 404

    return song.to_dict()

@song_routes.route('/user/current')
@login_required
def get_all_songs_current():
    # return "hello"
    songs = Song.query.filter(Song.user_id == current_user.id).all()

    if not songs:
        return {"message": "song not found"}

    return [song.to_dict() for song in songs]
