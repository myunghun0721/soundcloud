// Action type constants:

// load comments base on song id
const LOAD_COMMENTS_BY_SONG_ID = 'song/:songId/comments'

// Action creators for loading comments:

export const loadCommentsBySongId = comments => ({
    type: LOAD_COMMENTS_BY_SONG_ID,
    payload: comments
})

// Thunk actions:

// fetch all the comments by song id
export  const thunkFetchComments = (songId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/comments`)
    console.log("this is the res from store", res)
    const comments = await res.json()
    console.log("This is the comments from store redux",comments)
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
        default:
            return state
    }
}

export default commentReducer

