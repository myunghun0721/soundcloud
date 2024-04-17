
// Action type constanst 
const LOAD_SONGS = 'songs/loadSongs';
const LOAD_SONG_BY_ID = 'songs/loadSongById'


// Action  creators for loading data

export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})

export const loadSongById = song => ({
    type: LOAD_SONG_BY_ID,
    payload: song
})


// Thunk actions
export const thunkFetchSongs = () => async dispatch => {
    const res = await fetch('/api/songs')

    if(res.ok){
        const songs = await res.json()
        dispatch(loadSongs(songs))
    }
}

export const thunkFetchSongById = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`)
    // console.log(res)
    const song = await res.json()
    // console.log("this is the song from store:", song)
    dispatch(loadSongById(song))
    return song

}

const songReducer = (state={}, action) =>{
    switch(action.type){
        case LOAD_SONGS: {

            const newSongsState = {...state}
            action.payload.forEach(song => newSongsState[song.id] = song)
            // console.log("====>",newSongsState)
            return newSongsState
        }
        case LOAD_SONG_BY_ID: {
            return {...state, [action.payload.id]: action.payload}
        }

        default:
            return state


    }
}
export default songReducer;
