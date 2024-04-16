from flask_wtf import FlaskForm
from wtforms import SubmitField

class AddLikeToSong(FlaskForm):
    submit = SubmitField('Add Like')
