from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS


class AddSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    album = StringField('Album')
    release_date = DateField('Release Date')
    genre = StringField('Genre')
    # preview_img = StringField('Preview Image URL')
    # song_url = StringField('Song Url')
    preview_img = FileField('preview image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    song_url = FileField('Song',validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Add Song')
