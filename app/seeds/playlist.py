from app.models import db, Playlist, SCHEMA, environment
from sqlalchemy.sql import text

def seed_playlist():
    playlist = [
        Playlist(title="Summer Vibes", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_1.jpg"),
        Playlist(title="Electronic Essentials", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_2.jpg"),
        Playlist(title="Hip Hop Beats", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_3.jpg"),
        Playlist(title="Blues Background", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_4.jpg"),

        Playlist(title="Winter Moods", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_5.jpg"),
        Playlist(title="Country Roads", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_6.jpg"),
        Playlist(title="Indie Gems", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_7.jpg"),
        Playlist(title="Workout Energizers", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_8.jpg"),

        Playlist(title="Rock Hits", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_9.jpg"),
        Playlist(title="R&B Favorites", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_10.jpg"),
        Playlist(title="Reggae Rhythms", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_11.jpg"),
        Playlist(title="Night Drive", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_12.jpg"),

        Playlist(title="Jazz Classics", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_13.jpg"),
        Playlist(title="Classical Pieces", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_14.jpg"),
        Playlist(title="Pop Hits", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/playlist-img/playlist_img_15.jpg"),

    ]
    db.session.add_all(playlist)
    db.session.commit()


def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM playlists"))
    db.session.commit()
