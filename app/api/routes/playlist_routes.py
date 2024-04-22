from flask import Blueprint, jsonify, request
from app.models import Song, db, Playlist, User, Song, playlist_songs
from app.forms import PlaylistForm
from flask_login import current_user, login_required
from datetime import datetime
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
def playlist_index():
    # print("=========>",current_user.id)
    palylists = Playlist.query.all()
    # print(songs)
    # for song in songs:
    return [playlist.to_dict() for playlist in palylists]


@playlist_routes.route('/user/current')
@login_required
def get_all_playlists_current():
    # return "hello"
    playlist = Playlist.query.filter(Playlist.user_id == current_user.id).all()

    if not playlist:
        return {"message": "song not found"}

    return [playlist.to_dict() for playlist in playlist]

@playlist_routes.route('/<int:playlistId>', methods=['DELETE'])
@login_required
def delete_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)

    if not playlist:
        return {"message": "song not found"}

    if current_user.id != playlist.user_id:
        return {"message": "your nott he owner of this song", "current_user": current_user.id, "song_owner": playlist.user_id}

    remove_file_from_s3(playlist.preview_img) if '/' in playlist.preview_img else None

    db.session.delete(playlist)
    db.session.commit()

    return {"message": "delete successful"}

@playlist_routes.route('/new', methods=['POST'])
@login_required
def post_playlist():

    form = PlaylistForm()

    form['csrf_token'].data =request.cookies['csrf_token']

    if form.validate_on_submit():
        preview_img = form.data['preview_img']
        if(preview_img):
            preview_img.filename = get_unique_filename(preview_img.filename)
            preview_img_upload = upload_file_to_s3(preview_img)
        params = {
            'title' : form.data['title'],
            'preview_img' : preview_img_upload['url'] if preview_img else None,
            'user_id': current_user.id
        }

        new_playlist = Playlist(**params)
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
<<<<<<< HEAD

    return {"message": "validation failed"}, 401

@playlist_routes.route('/<int:playlistId>/song/<int:songId>', methods=['POST'])
@login_required
def add_song_playlist(playlistId, songId):
    print("==========================", playlistId, songId)
    song = playlist_songs.insert().values(playlist_id=playlistId, song_id=songId)
    db.session.execute(song)
    db.session.commit()
    return {"message": "added song to the playlist"}
=======
    return {"message": "validation failed"}

@playlist_routes.route('/<int:playlist_id>/songs', methods=['POST'])
@login_required
def get_playlist_songs(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if playlist is None:
        return jsonify("playlist not found"), 404

    songs = db.session.query(Song.id).join(playlist_songs).filter(playlist_songs.c.playlist_id == playlist_id).all()


    return jsonify(songs.to_dict())
>>>>>>> revert
