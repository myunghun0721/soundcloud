from app.models import db, Song, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_songs():
    songs = [
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/maybe+man.mp3", title="Maybe Man", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/maybe-man.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/touchy+feely+fool.mp3", title="Touchy Feely Fool", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/touchy-feely.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/yes+ima+mess.mp3", title="Yes I'm A Mess", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/yes-ima-mess.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/the+dumb+song.mp3", title="The Dumb Song", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/the-dumb-song.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/inertia.mp3", title="Inertia", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/inertia.png"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Nathan+Evans+-+Wellerman+(Sea+Shanty).mp3", title="Wellerman", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/wellerman.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Bully+Boys.mp3", title="Bully Boys", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Bully+Boys.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Drunken+Sailor.mp3", title="Drunken Sailor", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Drunken+Sailor.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Roll+The+Old+Chariot.mp3", title="Roll The Old Chariot", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Roll+The+Old+Chariot.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Nathan+Evans+-+The+Last+Shanty+(Official+Video).mp3", title="The Last Shanty", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/The+Last+Shanty.png"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Coldplay+-+Politik.mp3", title="Politik", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Politik.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Coldplay+-+In+My+Place.mp3", title="In My Place", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/In+My+Place.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Coldplay+-+God+Put+A+Smile+Upon+Your+Face+(Official+Video).mp3", title="God Put a Smile upon Your Face", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/God+Put+a+Smile+upon+Your+Face.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Coldplay+-+The+Scientist+(Official+4K+Video).mp3", title="The Scientist", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/The+Scientist.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Coldplay+-+Clocks+(Official+Video).mp3", title="Clocks", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Clocks.png"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Gryffin+-+Winnebago+(Audio)+ft.+Quinn+XCII%2C+Daniel+Wilson.mp3", title="Winnebago", artist="Gryffin", album="Winnebago", release_date=datetime(2024, 4,20), genre="Electronic dance music", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/winnebago+gryffin.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Jeremy+Zucker+-+all+the+kids+are+depressed+Lyrics.mp3", title="all the kids are depressed", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/all+the+kids+are+depressed.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Jeremy+Zucker+-+wildfire+(Official+Audio).mp3", title="wildfire", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/wildfire+jeremy+zucker.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Jeremy+Zucker+-+glisten+(interlude)+(Official+Audio).mp3", title="glisten", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/glisten+jeremy+zucker.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Chelsea+Cutler%2C+Jeremy+Zucker+-+better+off+(Live+Performance)+Vevo.mp3", title="better off", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/better+off+jeremy+zucker.png")
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
