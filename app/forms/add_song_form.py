from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('User must be logged in to add song.')


class AddSongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    artist = StringField('Artist', validators=[DataRequired()])
    album = StringField('Album')
    release_date = DateField('Release Date')
    genre = StringField('Genre')
    preview_img = StringField('Preview Image URL')
    submit = SubmitField('Add Song')
