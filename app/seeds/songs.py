from app.models import db, Song, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_songs():
    songs = [
        Song(song_url="place holder for song url", title="Maybe Man", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Touchy Feely Fool", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Yes I'm A Mess", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="The Dumb Song", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Inertia", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="place holder for img url"),

        Song(song_url="place holder for song url", title="Wellerman", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Bully Boys", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Drunken Sailor", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Roll The Old Chariot", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="The Last Shanty", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="place holder for img url"),

        Song(song_url="place holder for song url", title="Politik", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="In My Place", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="God Put a Smile upon Your Face", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="The Scientist", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="Clocks", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="place holder for img url"),

        Song(song_url="place holder for song url", title="Winnebago", artist="Gryffin", album="Winnebago", release_date=datetime(2024, 4,20), genre="Electronic dance music", user_id=4, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="all the kids are depressed", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="wildfire", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="glisten", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="place holder for img url"),
        Song(song_url="place holder for song url", title="better off", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="place holder for img url")
    ]

    for song in songs:
        db.session.add(song)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
