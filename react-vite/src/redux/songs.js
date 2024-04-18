const LOAD_SONGS = 'songs/loadSongs';
const FETCH_SONGS_BY_ID = "FETCH_SONGS_BY_ID"

export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})

export const fetchSongsById = song => ({
    type: FETCH_SONGS_BY_ID,
    payload: song
})

export const thunkFetchSongsById = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`);

    if (res.ok){
        const song = await res.json()
        dispatch(fetchSongsById(song))
    }
}

export const thunkFetchSongs = () => async dispatch => {
    const res = await fetch('/api/songs/')

    if(res.ok){
        const songs = await res.json()
        dispatch(loadSongs(songs))
    }
}


const songReducer = (state={}, action) =>{
    switch(action.type){
        case LOAD_SONGS: {

            const newSongsState = {...state}
            action.payload.forEach(song => newSongsState[song.id] = song)
            // console.log("====>",newSongsState)
            return newSongsState
        }
        case FETCH_SONGS_BY_ID:
        return {
            ...state,
            [action.payload.songId]: action.payload
        }
        default:
            return state
    }
}
export default songReducer;
