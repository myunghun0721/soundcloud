// Action constanst 
// Load like base on song id
const LOAD_ALL_LIKES_BY_SONG_ID = '/songs/:songId/likes'

// Post Like

const ADD_LIKE = 'like/add'

// Remove Like

const REMOVE_LIKE = 'like/remove'


const CLEAR_LIKES = 'likes/clear';

//Action creators for loading likes
// Action creator
export const clearLikes = () => ({
    type: CLEAR_LIKES
});

export const removeLike = like => ({
    type: REMOVE_LIKE,
    payload: like
})

export const addLike  = like => ({
    type: ADD_LIKE,
    payload: like
})

export const loadLikesBySongId  = likes => ({
    type: LOAD_ALL_LIKES_BY_SONG_ID,
    payload: likes
})

// Thunk action
//Remove like
export const thunkRemoveLike = (songId) => async dispatch =>  {
    const res = await fetch(`/api/song/${songId}/likes/delete`, {
        method: "DELETE"
    })
    if(res.ok){
        const like = await res.json()
        console.log("from thunk",like)
        dispatch(removeLike(like))
        return like
    }
    else {
        return "remove like thunk error"
    }
}

// Add like
export const thunkAddLike = (songId) => async dispatch =>  {
    const res = await fetch(`/api/song/${songId}/likes/add`, {
        method: "POST"
    })
    if(res.ok){
        const like = await  res.json()
        dispatch(addLike(like))
        return like
    }
    else{
        return "thunk add like error"
    }
}
// Fetch all likes by song id
export const thunkFetchLikes = (songId) => async dispatch => {
    const res = await fetch(`/api/song/${songId}/likes`)
    const likes = await res.json()
    dispatch(loadLikesBySongId(likes))
    return likes
}
const initailState = {
    likesBySong: {},
    likeCounts: {}
}
const likeReducer = (state=initailState, action) => {
    switch(action.type){
        case LOAD_ALL_LIKES_BY_SONG_ID: {
            const { like_info, likeCount} = action.payload
            const songId = like_info.length > 0 ? like_info[0].song_id: []
            return {
                ...state,
                likesBySong: {
                    ...state.likesBySong,[songId]: like_info
                },
                likeCounts: {
                    ...state.likeCounts,
                    [songId]: likeCount
                }
            }
        }
        case ADD_LIKE: 
        case REMOVE_LIKE: {
            const { like_info, likeCount} = action.payload
            const songId = like_info.length > 0 ? like_info[0].song_id: null
            if(songId === null && like_info.length === 0){
                return {...state,
                    likesBySong: {},
                    likeCounts: {}
                }

            }
            
        return {
            ...state,
            likesBySong: {
                ...state.likesBySong,
                [songId]: like_info
            },

            likeCounts: {
                ...state.likeCounts,
                [songId]: likeCount
            }
        
    }
        }
        case CLEAR_LIKES:
            return {
                ...state,
                likesBySong: {},
                likeCounts: {}
            };
        default:
            return state
    }
}

export default likeReducer