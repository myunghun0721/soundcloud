from app.models import db, Song, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_songs():
    songs = [
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/yame_demo.mp3", title="Maybe Man", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/smooth_criminal_demo.mp3", title="Touchy Feely Fool", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/dandelions_demo.mp3", title="Yes I'm A Mess", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/guiter_demo.mp3", title="The Dumb Song", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/friday_night_demo.mp3", title="Inertia", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img=""),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/eye_of_tiger_demo.mp3", title="Wellerman", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demo_song.mp3", title="Bully Boys", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/dandelions_demo.mp3", title="Drunken Sailor", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/Acustic_guiter_demo.mp3", title="Roll The Old Chariot", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demo_song.mp3", title="The Last Shanty", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/yame_demo.mp3", title="Politik", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/smooth_criminal_demo.mp3", title="In My Place", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/guiter_demo.mp3", title="God Put a Smile upon Your Face", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/friday_night_demo.mp3", title="The Scientist", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/eye_of_tiger_demo.mp3", title="Clocks", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img=""),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demo_song.mp3", title="Winnebago", artist="Gryffin", album="Winnebago", release_date=datetime(2024, 4,20), genre="Electronic dance music", user_id=4, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/dandelions_demo.mp3", title="all the kids are depressed", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/saxophone_demo.mp3", title="wildfire", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/friday_night_demo.mp3", title="glisten", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/dandelions_demo.mp3", title="better off", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="")
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
