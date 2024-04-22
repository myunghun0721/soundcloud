from app.models import db, Playlist, SCHEMA, environment
from sqlalchemy.sql import text

def seed_playlist():
    playlist = [
        Playlist(title="Summer Vibes", user_id=1, preview_img="https://i.postimg.cc/852BX11j/summer.jpg"),
        Playlist(title="Winter Moods", user_id=2, preview_img="https://i.postimg.cc/44pzNRfQ/winter.jpg"),
        Playlist(title="Rock Hits", user_id=3, preview_img="https://i.postimg.cc/pdtvvjqZ/rock-hits.jpg"),
        Playlist(title="Jazz Classics", user_id=4, preview_img="https://i.postimg.cc/1X4hBr39/images.png"),
        Playlist(title="Electronic Essentials", user_id=1, preview_img="https://i.postimg.cc/wMnPVKrV/electronic-essentials.jpg"),
        Playlist(title="Country Roads", user_id=2, preview_img="https://i.postimg.cc/Bn9kP0HZ/country-roads.jpg"),
        Playlist(title="R&B Favorites", user_id=3, preview_img="https://i.postimg.cc/nh1xHzgf/rnb-favorites.jpg"),
        Playlist(title="Classical Pieces", user_id=4, preview_img="https://i.postimg.cc/1zYLtNK2/classical-pieces.jpg"),
        Playlist(title="Hip Hop Beats", user_id=1, preview_img="https://i.postimg.cc/bNj4sPQy/hiphop.jpg"),
        Playlist(title="Indie Gems", user_id=2, preview_img="https://i.postimg.cc/g2z5HKS1/indie-rock.jpg"),
        Playlist(title="Reggae Rhythms", user_id=3, preview_img="https://i.postimg.cc/VkkGCk58/reggae.jpg"),
        Playlist(title="Pop Hits", user_id=4, preview_img="https://i.postimg.cc/gJFHNzcr/pop.jpg"),
        Playlist(title="Blues Background", user_id=1, preview_img="https://i.postimg.cc/PfMQQngr/blues.jpg"),
        Playlist(title="Workout Energizers", user_id=2, preview_img="https://i.postimg.cc/nL7vsyKx/workout.jpg"),
        Playlist(title="Night Drive", user_id=3, preview_img="https://i.postimg.cc/Vv7MQmwq/night-drive.jpg")

    ]
    db.session.add_all(playlist)
    db.session.commit()


def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM playlists"))
    db.session.commit()
