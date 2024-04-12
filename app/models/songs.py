from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from ..models import playlist_songs

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist=db.Column(db.String(255), nullable=False)
    album = db.Column(db.String(255))
    release_date = db.Column(db.DateTime, default=datetime.utcnow)
    genre = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #relationships
    comments = db.relationship('Comment', back_populates='song')
    user = db.relationship("User", back_populates="songs")

    # join table relationship
    song_likes = db.relationship("User", secondary=likes, back_populates="user_likes")
    song_to_playlists = db.relationship("Playlist", secondary=playlist_songs, back_populates="playlist_to_songs")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist,
            'album': self.album,
            'release_date': self.release_date,
            'genre': self.genre,
            'user_id': self.user_id
        }
