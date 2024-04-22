// Action type constanst
const LOAD_SONGS = 'songs/loadSongs';
const FETCH_SONGS_BY_ID = "FETCH_SONGS_BY_ID"
const LOAD_SONG_BY_ID = 'songs/loadSongById'
const UPDATE_SONG = "UPDATE_SONG"

// Action  creators for loading data
const UPLOAD_SONG = 'songs/uploadSong';
const DELETE_SONG = 'songs/deleteSong';

export const deleteSongStore = (songId, deleteSongConfirm) =>({
    type: DELETE_SONG,
    payload: {
        songId,
        deleteSongConfirm
    }
})
export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
})
export const uploadSong = song =>({
    type: UPLOAD_SONG,
    payload: song
})

export const fetchSongsById = song => ({
    type: FETCH_SONGS_BY_ID,
    payload: song
})

export const updateSong = song => ({
    type: UPDATE_SONG,
    payload: song
})

export const thunkFetchSongsById = (songId) => async dispatch => {
    const res = await fetch(`/api/songs/${songId}`);

    if (res.ok){
        const song = await res.json()
        dispatch(fetchSongsById(song))
        return song
    }
}

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
export const thunkUploadSongs = (song) => async dispatch => {
    const res = await fetch('/api/songs/new',{
        method: 'POST',
        body: song
    })
    if(res.ok){
        const song = await res.json()
        dispatch(uploadSong(song))
        return song
    }
    else{
        return "song thunk error"
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

export const thunkDeleteSong = (songId) => async dispatch =>{
    const res = await fetch(`/api/songs/${songId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok){
        const deleteSongConfirm = await res.json()
        dispatch(deleteSong(songId, deleteSongConfirm))
        return deleteSongConfirm
    }
    else{
        return "thunk delete song error"
    }

}

export const thunkUpdateSong = (song, id) => async (dispatch) => {
      const response = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        body: song
      });

      console.log("=========>", response)

      if (!response.ok) {
        throw new Error('Failed to update the song.');
      }

      const updatedSong = await response.json();
      dispatch(updateSong(updatedSong));
      return updatedSong;
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
            [action.payload.id]: action.payload
        }
        case LOAD_SONG_BY_ID: {
            return {...state, [action.payload.id]: action.payload}
        }
        case UPLOAD_SONG: {
            const newSongsState = {...state}
            newSongsState[action.payload.id] = action.payload
            // console.log("🚀 ~ songReducer ~ newSongsState:", newSongsState)
            return newSongsState
        }
        case DELETE_SONG: {
            if(action.payload.deleteSongConfirm.message === "delete successful"){
            const newSongState = {...state}
            delete newSongState[action.payload.songId]
            return newSongState
        }
        return {...state}
    }
        case UPDATE_SONG: {
            const editSongState = {...state}
            editSongState[action.payload.id] = action.payload
            return editSongState
        }

        default:
            return state


    }
}
export default songReducer;
