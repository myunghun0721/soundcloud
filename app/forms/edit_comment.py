from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired

class EditCommentForm(FlaskForm):
    body = TextAreaField('Comment', validators=[DataRequired()])
    submit = SubmitField('Update Comment')
