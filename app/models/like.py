from .db import db
likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True)
)


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
