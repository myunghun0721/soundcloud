from flask import Blueprint, jsonify, request
from app.models import Song, db, Playlist, User
from ...forms import AddSongForm
from flask_login import current_user, login_required
from datetime import datetime
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

song_routes = Blueprint('songs', __name__)

@song_routes.route('/')
def song_index():
    songs = Song.query.all()
    print(songs)
    # for song in songs:
    return [song.to_dict() for song in songs]

# @song_routes.route('/new', methods=['POST'])
# # @login_required
# def post_song():
#     print("=========from song route===============")
#     print("UserId, =======>", current_user)
#     print("UserId, =======>", current_user.id)
    # form = AddSongForm()

    # form['csrf_token'].data =request.cookies['csrf_token']

    # if form.validate_on_submit():

    #     song_url = form.data["song_url"]
    #     song_url.filename = get_unique_filename(song_url.filename)
    #     song_upload = upload_file_to_s3(song_url)
    #     print("--->", song_url)

    #     preview_img = form.data['preview_img']
    #     if(preview_img):
    #         preview_img.filename = get_unique_filename(preview_img.filename)
    #         preview_img_upload = upload_file_to_s3(preview_img)

    #     params = {
    #         'title' : form.data['title'],
    #         'artist' : form.data['artist'],
    #         'album' : form.data['album'],
    #         'release_date' : form.data['release_date'],
    #         'genre' : form.data['genre'],
    #         'user_id': current_user.id,
    #         'preview_img' : preview_img_upload['url'] if preview_img else None,
    #         'song_url': song_upload['url']
    #     }

    #     new_song = Song(**params)
    #     db.session.add(new_song)
    #     db.session.commit()
    #     return new_song.to_dict()

    # return {"message": "validation failed"}, 401

@song_routes.route('/new', methods=['POST'])
@login_required
def post_song():
    print("=========from song route===============")
    print("UserId, =======>", current_user)
    print("UserId, =======>", current_user.id)
    form = AddSongForm()

    form['csrf_token'].data =request.cookies['csrf_token']

    # if form.validate_on_submit():

        # song_url = form.data["song_url"]
        # song_url.filename = get_unique_filename(song_url.filename)
        # song_upload = upload_file_to_s3(song_url)
        # print("--->", song_url)

        # preview_img = form.data['preview_img']
        # if(preview_img):
        #     preview_img.filename = get_unique_filename(preview_img.filename)
        #     preview_img_upload = upload_file_to_s3(preview_img)

    print('title:', form.data['title'])
    print('artist:', form.data['artist'])
    print('album:', form.data['album'])
    print('release_date:', form.data['release_date'])
    print('genre:', form.data['genre'])
    print('user_id:', current_user.id)
    print('preview_img:', form.data['preview_img'])
    print('song_url:', form.data["song_url"])
   

        # new_song = Song(**params)
        # db.session.add(new_song)
        # db.session.commit()
        # return new_song.to_dict()
    return {"message": "success"}

    # return {"message": "validation failed"}, 401

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
        return {"message": "song not found"}

    return song.to_dict()

@song_routes.route('/user/current')
@login_required
def get_all_songs_current():
    # return "hello"
    songs = Song.query.filter(Song.user_id == current_user.id).all()

    if not songs:
        return {"message": "song not found"}

    return [song.to_dict() for song in songs]
