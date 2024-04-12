from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField
from wtforms.validators import DataRequired

class AddSongToPlaylistForm(FlaskForm):
    playlist_id = SelectField('Playlist', coerce=int, validators=[DataRequired()])
    song_id = SelectField('Song', coerce=int, validators=[DataRequired()])
    submit = SubmitField('Add Song')
