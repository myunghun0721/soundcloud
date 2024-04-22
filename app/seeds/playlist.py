from app.models import db, Playlist, SCHEMA, environment
from sqlalchemy.sql import text

def seed_playlist():
    playlist = [
        Playlist(title="Summer Vibes", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/rose_graphic_logo_by_derpytots_dea0ju6-pre.jpg"),
        Playlist(title="Winter Moods", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/rose_graphic_logo_by_derpytots_dea0ju6-pre.jpg"),
        Playlist(title="Rock Hits", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/rose_graphic_logo_by_derpytots_dea0ju6-pre.jpg"),
        Playlist(title="Jazz Classics", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/rose_graphic_logo_by_derpytots_dea0ju6-pre.jpg"),
        Playlist(title="Electronic Essentials", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/morning_tea_by_cortoony_dh7j4jd-375w-2x.jpg"),
        Playlist(title="Country Roads", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/morning_tea_by_cortoony_dh7j4jd-375w-2x.jpg"),
        Playlist(title="R&B Favorites", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/morning_tea_by_cortoony_dh7j4jd-375w-2x.jpg"),
        Playlist(title="Classical Pieces", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/morning_tea_by_cortoony_dh7j4jd-375w-2x.jpg"),
        Playlist(title="Hip Hop Beats", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/morning_tea_by_cortoony_dh7j4jd-375w-2x.jpg"),
        Playlist(title="Indie Gems", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/random_album_cover_by_derpytots_ddqk76a-pre.jpg"),
        Playlist(title="Reggae Rhythms", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/random_album_cover_by_derpytots_ddqk76a-pre.jpg"),
        Playlist(title="Pop Hits", user_id=4, preview_img="https://soundcloud-aws.s3.amazonaws.com/random_album_cover_by_derpytots_ddqk76a-pre.jpg"),
        Playlist(title="Blues Background", user_id=1, preview_img="https://soundcloud-aws.s3.amazonaws.com/random_album_cover_by_derpytots_ddqk76a-pre.jpg"),
        Playlist(title="Workout Energizers", user_id=2, preview_img="https://soundcloud-aws.s3.amazonaws.com/soundcloud-icon.png"),
        Playlist(title="Night Drive", user_id=3, preview_img="https://soundcloud-aws.s3.amazonaws.com/soundcloud-icon.png")

    ]
    db.session.add_all(playlist)
    db.session.commit()


def undo_playlist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM playlists"))
    db.session.commit()
