// Action constanst 
// Load like base on song id
const LOAD_ALL_LIKES_BY_SONG_ID = '/songs/:songId/likes'

//Action creators for loading likes

export const loadLikesBySongId  = likes => ({
    type: LOAD_ALL_LIKES_BY_SONG_ID,
    payload: likes
})

// Thunk action
// Fetch all likes by song id
export const thunkFetchLikes = (songId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/likes`)
    const likes = await res.json()
    dispatch(loadLikesBySongId(likes))
    console.log("This is the likes from redux store", likes)
    return likes
}

const likeReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_ALL_LIKES_BY_SONG_ID: {
            return {... state, like_count: action.payload}
        }
        default:
            return state
    }
}

export default likeReducer