const LOAD_SONGS = 'songs/loadSongs';
const UPLOAD_SONG = 'songs/uploadSong';

export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})
export const uploadSong = song =>({
    type: UPLOAD_SONG,
    payload: song
})

export const thunkFetchSongs = () => async dispatch => {
    const res = await fetch('/api/songs/')

    if(res.ok){
        const songs = await res.json()
        dispatch(loadSongs(songs))
    }
}
export const thunkUploadSongs = (song) => async dispatch => {
    console.log("before res")
    const res = await fetch('/api/songs/',{
        method: 'POST',
        body: song
    })
    console.log("After res")
    if(res.ok){
        console.log("thunk res ok")
        const song= await res.json()
        // dispatch(uploadSong(song))
    }
    else{
        return "song thunk error"
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

        case UPLOAD_SONG: {
            const newSongsState = {...state}
            newSongsState[action.song.id] = action.song
            return newSongsState
        }

        default:
            return state


    }
}
export default songReducer;
