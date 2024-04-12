from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    preview_img = StringField('Preview Image URL')
    submit = SubmitField('Create Playlist')
