from flask import Blueprint, request, jsonify, render_template
from app.models import Comment, db
from app.forms import AddCommentForm, EditCommentForm
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:songId>/comments', methods=['GET'])
def get_all_comments(songId):
     
    comments = Comment.query.filter_by(song_id=songId).all()
    comments = [comment.to_dict() for comment in comments]
    # return jsonify([comment.to_dict() for comment in comments])
    return jsonify(comments)

@comment_routes.route('/<int:songId>/comments/new', methods=['POST'])
@login_required
def post_comment(songId):

    # if current_user is not None:
    current_user_id = current_user.id
    form = AddCommentForm()
    current_body = request.form.get('body')

    if form.validate_on_submit():
        comment = Comment(song_id=songId, user_id=current_user_id, body=current_body)\

        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict())
    else:
        return jsonify("validation failed"),404

@comment_routes.route('/<int:songId>/comments/<int:commentId>', methods=['PUT'])
def update_comment(songId, commentId):
    form = AddCommentForm()
    comment = Comment.query.filter_by(id=commentId, song_id=songId).first()
    if request.method=="GET":
        comment_data = {
            'body': comment.body
        }
        form.process(data=comment_data)

    elif request.method=="POST" and form.validate_on_submit():
        body = request.form.get('body')
        comment.body = body
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict())
    else:
        return jsonify("form not validated")


@comment_routes.route('/<int:songId>/comments/<int:commentId>/delete', methods=['DELETE'])
@login_required
def delete_comment(songId, commentId):
    comment = Comment.query.get(commentId)
    print(comment)
    if comment is None:
        return jsonify("Comment can't be found"), 404

    if current_user.id == comment.user_id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify("successfully deleted")
    else:
        return jsonify("Can't delete comment thats not yours")
