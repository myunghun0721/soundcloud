// Action type constants:

// load comments base on song id
const LOAD_COMMENTS_BY_SONG_ID = 'song/:songId/comments'

//Clear comment
const CLEAR_COMMENTS ='/comments/CLEAR_COMMENTS'

// Add comment
const ADD_COMMENT = 'comments/new'

// Edit comment

const EDIT_COMMENT = 'comments/edit'
// Delete comment
const DELETE_COMMENT = 'comments/delete'
// Action creators for loading comments:

export const loadCommentsBySongId = comments => ({
    type: LOAD_COMMENTS_BY_SONG_ID,
    payload: comments
})

export const addCommentBySongId = comment => ({
    type: ADD_COMMENT,
    payload :comment

})
// clear comments previous comments when loading into new song
export const clearComment = () => ({
    type: CLEAR_COMMENTS

})
export const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    payload: commentId
})

// edit comment action creator
export const editComment = comment => ({
    type: EDIT_COMMENT,
    payload: comment


})

// Thunk actions:

// fetch all the comments by song id
export  const thunkFetchComments = (songId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/comments`)
    const comments = await res.json()
    dispatch(loadCommentsBySongId(comments))
    return comments
}

// Post comment
export const thunkPostComment = (songId, comment) => async dispatch => {
    const formData = new FormData()
    formData.append('body', comment)
    const res = await fetch(`/api/song/${songId}/comments/new`, {
        method: 'POST',
        body:formData

    })
    if(res.ok) {
        const comment = await res.json()
         dispatch(addCommentBySongId(comment))
        return comment
    }
    else{
        return "comment thunk error"
    }
}
// Delete comment
export const thunkDeleteComment = (songId,commentId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/comments/${commentId}/delete`,{
        method: "DELETE"
    })
    if(res.ok){
        dispatch(deleteComment(commentId))
    }

}

// Edit comment thunk

export const thunkEditComment = (songId, commentId, comment) => async dispatch => {
    const formData = new FormData()
    formData.append("body", comment)
    const res = await fetch(`/api/song/${songId}/comments/${commentId}`,{
        method: "PUT",
        body: formData
    })
    if(res.ok){
        comment = await res.json()
        dispatch(editComment(comment))
        return comment

    }
    else {
        return "comment edit thunk error"

    }
}
// comments reducers
const commentReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_COMMENTS_BY_SONG_ID: {
            const newCommentsState = {...state};
            action.payload.forEach(comment => {
                newCommentsState[comment.id] = comment;
            });
            return newCommentsState;
        }
        case ADD_COMMENT: {
            return {...state, [action.payload.id]: action.payload};
        }
        case EDIT_COMMENT: {
            return {...state, [action.payload.id]: action.payload};
        }
        case DELETE_COMMENT: {
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        }
        case CLEAR_COMMENTS:
            return {};
        default:
            return state;
    }
};

export default commentReducer;
