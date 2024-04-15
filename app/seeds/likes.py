from app.models import db, environment, SCHEMA
from sqlalchemy import text

def seed_likes():

    likes = [
        {"user_id": 1, "song_id": 1},
        {"user_id": 1, "song_id": 2},
        {"user_id": 2, "song_id": 3},
        {"user_id": 3, "song_id": 4},
        {"user_id": 4, "song_id": 5},
        {"user_id": 1, "song_id": 6},
        {"user_id": 2, "song_id": 7},
        {"user_id": 3, "song_id": 8},
        {"user_id": 4, "song_id": 9},
        {"user_id": 1, "song_id": 10},
        {"user_id": 2, "song_id": 11},
        {"user_id": 3, "song_id": 12},
        {"user_id": 4, "song_id": 13},
        {"user_id": 1, "song_id": 14},
        {"user_id": 2, "song_id": 15},
        {"user_id": 3, "song_id": 16},
        {"user_id": 4, "song_id": 17},
        {"user_id": 1, "song_id": 18},
        {"user_id": 2, "song_id": 19},
        {"user_id": 3, "song_id": 20},
    ]
    for like in likes:
        db.session.add(like)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
