from app.models import db, Song, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_songs():
    songs = [
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/maybe%2Bman.mp3", title="Maybe Man", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/maybe-man.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/touchy%2Bfeely%2Bfool.mp3", title="Touchy Feely Fool", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/touchy-feely.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/yes%2Bima%2Bmess.mp3", title="Yes I'm A Mess", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/yes-ima-mess.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/the%2Bdumb%2Bsong.mp3", title="The Dumb Song", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/the-dumb-song.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/the%2Bdumb%2Bsong.mp3", title="Inertia", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/inertia.png"),

        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Nathan%2BEvans%2B-%2BWellerman%2B(Sea%2BShanty).mp3", title="Wellerman", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/wellerman.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Bully%2BBoys.mp3", title="Bully Boys", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Bully+Boys.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Drunken%2BSailor.mp3", title="Drunken Sailor", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Drunken+Sailor.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Roll%2BThe%2BOld%2BChariot.mp3", title="Roll The Old Chariot", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Roll+The+Old+Chariot.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Nathan%2BEvans%2B-%2BThe%2BLast%2BShanty%2B(Official%2BVideo).mp3", title="The Last Shanty", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/The+Last+Shanty.png"),

        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Coldplay%2B-%2BPolitik.mp3", title="Politik", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Politik.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Coldplay%2B-%2BIn%2BMy%2BPlace.mp3", title="In My Place", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/In+My+Place.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Coldplay%2B-%2BGod%2BPut%2BA%2BSmile%2BUpon%2BYour%2BFace%2B(Official%2BVideo).mp3", title="God Put a Smile upon Your Face", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/God+Put+a+Smile+upon+Your+Face.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Coldplay%2B-%2BGod%2BPut%2BA%2BSmile%2BUpon%2BYour%2BFace%2B(Official%2BVideo).mp3", title="The Scientist", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/The+Scientist.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Coldplay%2B-%2BClocks%2B(Official%2BVideo).mp3", title="Clocks", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/Clocks.png"),

        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Gryffin%2B-%2BWinnebago%2B(Audio)%2Bft.%2BQuinn%2BXCII%2C%2BDaniel%2BWilson.mp3", title="Winnebago", artist="Gryffin", album="Winnebago", release_date=datetime(2024, 4,20), genre="Electronic dance music", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/winnebago+gryffin.png"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/music/Jeremy+Zucker+-+all+the+kids+are+depressed+Lyrics.mp3", title="all the kids are depressed", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/all+the+kids+are+depressed.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Jeremy%2BZucker%2B-%2Bwildfire%2B(Official%2BAudio).mp3", title="wildfire", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/wildfire+jeremy+zucker.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Jeremy%2BZucker%2B-%2Bglisten%2B(interlude)%2B(Official%2BAudio).mp3", title="glisten", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/glisten+jeremy+zucker.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/music/Chelsea%2BCutler%2C%2BJeremy%2BZucker%2B-%2Bbetter%2Boff%2B(Live%2BPerformance)%2BVevo.mp3", title="better off", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://soundcloud-aws.s3.amazonaws.com/music-cover/better+off+jeremy+zucker.png"),
        Song(song_url="https://tastedit-bucket.s3.amazonaws.com/seize-the-day-andrey-rossi-main-version-14571-01-40.mp3", title="size the day", artist="Andrey Rossi", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4,
        preview_img="https://tastedit-bucket.s3.amazonaws.com/music/Andrey-Rossi_Avatar_664050473290830.jpeg")
        
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
