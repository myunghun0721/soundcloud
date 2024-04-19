// Action type constants:

// load comments base on song id
const LOAD_COMMENTS_BY_SONG_ID = 'song/:songId/comments'

//Clear comment
const CLEAR_COMMENTS ='/comments/CLEAR_COMMENTS'

// Action creators for loading comments:

export const loadCommentsBySongId = comments => ({
    type: LOAD_COMMENTS_BY_SONG_ID,
    payload: comments
})

// clear comments previous comments when loading into new song 
export const clearComment = () => ({
    type: CLEAR_COMMENTS

})
// Thunk actions:

// fetch all the comments by song id
export  const thunkFetchComments = (songId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/comments`)
    const comments = await res.json()
    dispatch(loadCommentsBySongId(comments))
    return comments
}

// comments reducers
const commentReducer = (state={}, action)=>{
    switch(action.type){
        case LOAD_COMMENTS_BY_SONG_ID: {
            const newCommentsState = {...state}
            action.payload.forEach(comment =>newCommentsState[comment.id]=comment)
            return newCommentsState

        }
        case CLEAR_COMMENTS:
            return {}
        default:
            return state
    }
}

export default commentReducer

