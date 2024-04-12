from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    body = db.Column(db.Text)

    song = db.relationship("Song", back_populates="comments")
    user = db.relationship("User", back_populates="comments")

def to_dict(self):
    return {
        "id": self.id,
        "song_id": self.song_id,
        "user_id": self.user_id,
        "body": self.body,
        "created_at": self.created_at.isoformat()
    }
