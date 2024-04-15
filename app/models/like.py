from .db import db, environment, SCHEMA, add_prefix_for_prod
<<<<<<< HEAD
likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True)
)

if environment == "production":
    __table_args__ = {'schema': SCHEMA}
=======

likes = db.Table(
    'likes',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id'))),
)

if environment == "production":
    likes.schema = SCHEMA

>>>>>>> 1ae57e590151a06eeffbe3dafeb76a31e86d64b2

# from .db import db, environment, SCHEMA
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy.orm import relationship

# class Like(db.Model):
#     __tablename__ = 'likes'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

#     # Establishing relationship with Song and User
#     song = relationship("Song", back_populates="likes")
#     user = relationship("User", back_populates="likes")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'song_id': self.song_id,
#             'user_id': self.user_id
#         }
