from app.models import db, Comment, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_comments():
    comments = [
        Comment(song_id= 1, user_id=1, created_at=datetime(2024, 4, 14), body="place holder for user one comment"),
        Comment(song_id= 2, user_id=1, created_at=datetime(2024, 4, 14), body="place holder for user one comment"),
        Comment(song_id= 3, user_id=1, created_at=datetime(2024, 4, 14), body="place holder for user one comment"),
        Comment(song_id= 4, user_id=1, created_at=datetime(2024, 4, 14), body="place holder for user one comment"),
        Comment(song_id= 5, user_id=1, created_at=datetime(2024, 4, 14), body="place holder for user one comment"),

        Comment(song_id= 6, user_id=2, created_at=datetime(2024, 4, 14), body="place holder for user two comment"),
        Comment(song_id= 7, user_id=2, created_at=datetime(2024, 4, 14), body="place holder for user two comment"),
        Comment(song_id= 8, user_id=2, created_at=datetime(2024, 4, 14), body="place holder for user two comment"),
        Comment(song_id= 9, user_id=2, created_at=datetime(2024, 4, 14), body="place holder for user two comment"),
        Comment(song_id= 10, user_id=2, created_at=datetime(2024, 4, 14), body="place holder for user two comment"),

        Comment(song_id= 11, user_id=3, created_at=datetime(2024, 4, 14), body="place holder for user three comment"),
        Comment(song_id= 12, user_id=3, created_at=datetime(2024, 4, 14), body="place holder for user three comment"),
        Comment(song_id= 13, user_id=3, created_at=datetime(2024, 4, 14), body="place holder for user three comment"),
        Comment(song_id= 14, user_id=3, created_at=datetime(2024, 4, 14), body="place holder for user three comment"),
        Comment(song_id= 15, user_id=3, created_at=datetime(2024, 4, 14), body="place holder for user three comment"),

        Comment(song_id= 16, user_id=4, created_at=datetime(2024, 4, 14), body="place holder for user four comment"),
        Comment(song_id= 17, user_id=4, created_at=datetime(2024, 4, 14), body="place holder for user four comment"),
        Comment(song_id= 18, user_id=4, created_at=datetime(2024, 4, 14), body="place holder for user four comment"),
        Comment(song_id= 19, user_id=4, created_at=datetime(2024, 4, 14), body="place holder for user four comment"),
        Comment(song_id= 20, user_id=4, created_at=datetime(2024, 4, 14), body="place holder for user four comment")

    ]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
