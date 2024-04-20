from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS, AUDIO_ALLOWED_EXTENSIONS

class PlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    preview_img = FileField('preview image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create Playlist')
