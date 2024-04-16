const LOAD_SONGS = 'songs/loadSongs';

export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})

export const thunkFetchSongs = () => async dispatch => {
    const res = await fetch('/api/songs')

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

        default:
            return state


    }
}
export default songReducer;
