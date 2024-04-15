from app.models import db, Playlist, SCHEMA, environment
from sqlalchemy.sql import text

def seed_playlist():
    playlist = [
        Playlist(title="Summer Vibes", user_id=1, preview_img="place holder"),
        Playlist(title="Winter Moods", user_id=2, preview_img="place holder"),
        Playlist(title="Rock Hits", user_id=3, preview_img="place holder"),
        Playlist(title="Jazz Classics", user_id=4, preview_img="place holder"),
        Playlist(title="Electronic Essentials", user_id=5, preview_img="place holder"),
        Playlist(title="Country Roads", user_id=6, preview_img="place holder"),
        Playlist(title="R&B Favorites", user_id=7, preview_img="place holder"),
        Playlist(title="Classical Pieces", user_id=1, preview_img="place holder"),
        Playlist(title="Hip Hop Beats", user_id=2, preview_img="place holder"),
        Playlist(title="Indie Gems", user_id=3, preview_img="place holder"),
        Playlist(title="Reggae Rhythms", user_id=4, preview_img="place holder"),
        Playlist(title="Pop Hits", user_id=5, preview_img="place holder"),
        Playlist(title="Blues Background", user_id=6, preview_img="place holder"),
        Playlist(title="Workout Energizers", user_id=7, preview_img="place holder"),
        Playlist(title="Night Drive", user_id=1, preview_img="place holder")
        
    ]
    db.session.add_all(playlist)
    db.session.commit()


def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM playlists"))
    db.session.commit()