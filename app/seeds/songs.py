from app.models import db, Song, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_songs():
    songs = [
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Maybe Man", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526750/Songs/song_previews/caleb-george-pH88tHG-1yw-unsplash_oynhw6.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Touchy Feely Fool", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526795/Songs/song_previews/annie-spratt-4Hpljf9Y1ko-unsplash_uuxzje.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Yes I'm A Mess", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526792/Songs/song_previews/maxence-pira-PdRkq402WrM-unsplash_fvp9nv.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="The Dumb Song", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526791/Songs/song_previews/janis-straume-DKhc4MOiYo8-unsplash_rtrkg1.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Inertia", artist="AJR", album="The Maybe Man", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=1, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526780/Songs/song_previews/william-krause-DqmhZ2-6Nmw-unsplash_fvtefv.jpg"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Wellerman", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526778/Songs/song_previews/luke-thornton-8_RrNK5dg3k-unsplash_lnkskh.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Bully Boys", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526789/Songs/song_previews/morgan-von-gunten-n-sSgkvgslg-unsplash_gkpufk.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Drunken Sailor", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526777/Songs/song_previews/dominik-vanyi-5Fxuo7x-eyg-unsplash_dgz6it.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Roll The Old Chariot", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img=""),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="The Last Shanty", artist="Nathan Evans", album="Wellerman - The Album", release_date=datetime(2022, 11,4), genre="Pop, Folk, World, & Country", user_id=2, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526773/Songs/song_previews/zach-lezniewicz-czPs0z3-Ggg-unsplash_g7zjae.jpg"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Politik", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526771/Songs/song_previews/venti-views-mI1FkOY_r30-unsplash_ioj4ld.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="In My Place", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526769/Songs/song_previews/saeed-karimi--tu8vNJy7lo-unsplash_ufnuym.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="God Put a Smile upon Your Face", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526768/Songs/song_previews/raychan-2m06ystc2d4-unsplash_skmeeg.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="The Scientist", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526765/Songs/song_previews/kobe-subramaniam-QcM7_gq95_Y-unsplash_qklqlf.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Clocks", artist="Coldplay", album="A Rush of Blood to the Head", release_date=datetime(2002, 8,26), genre="post-britpop", user_id=3, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526763/Songs/song_previews/gracious-adebayo-zAPbXrhIfTU-unsplash_ngimbm.jpg"),

        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="Winnebago", artist="Gryffin", album="Winnebago", release_date=datetime(2024, 4,20), genre="Electronic dance music", user_id=4, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526762/Songs/song_previews/chris-7WfcHibcR3Y-unsplash_hfecwp.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="all the kids are depressed", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526755/Songs/song_previews/matt-botsford-OKLqGsCT8qs-unsplash_v36xio.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="wildfire", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526751/Songs/song_previews/james-owen-c-NBiJrhwdM-unsplash_yswgha.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="glisten", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526754/Songs/song_previews/konstantin-aal-Otx5FHbr3OE-unsplash_retn7o.jpg"),
        Song(song_url="https://soundcloud-aws.s3.amazonaws.com/demosong.mp3", title="better off", artist="Jeremy Zucker", album="Glisten", release_date=datetime(2023, 11,10), genre="indie-pop", user_id=4, preview_img="https://res.cloudinary.com/dsnllj445/image/upload/v1713526749/Songs/song_previews/austin-neill-hgO1wFPXl3I-unsplash_qlufku.jpg")
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
