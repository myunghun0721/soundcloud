from app.models import db, environment, SCHEMA
from app.models.playlist import Playlist, playlist_songs
from sqlalchemy.sql import text

def seed_playlist_songs():
    playlist_song_data = [
        {'song_id': 3, 'playlist_id': 1},
        {'song_id': 5, 'playlist_id': 1},
        {'song_id': 5, 'playlist_id': 1},
        {'song_id': 10, 'playlist_id': 1},
        {'song_id': 12, 'playlist_id': 2},
        {'song_id': 9, 'playlist_id': 2},
        {'song_id': 15, 'playlist_id': 2},
        {'song_id': 2, 'playlist_id': 2},
        {'song_id': 10, 'playlist_id': 3},
        {'song_id': 11, 'playlist_id': 3},
        {'song_id': 12, 'playlist_id': 3},
        {'song_id': 13, 'playlist_id': 3},
    ]
    db.session.execute(playlist_songs.insert(), playlist_song_data)
    db.session.commit()


def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
