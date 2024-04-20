
// Action type constanst
const LOAD_SONGS = 'songs/loadSongs';
const FETCH_SONGS_BY_ID = "FETCH_SONGS_BY_ID"
const LOAD_SONG_BY_ID = 'songs/loadSongById'
const UPDATE_SONG = "UPDATE_SONG"


// Action  creators for loading data
const UPLOAD_SONG = 'songs/uploadSong';
const DELETE_SONG = 'songs/deleteSong';

export const deleteSong = songId =>({
    type: DELETE_SONG,
    payload: songId
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
    const res = await fetch('/api/songs/')

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
        dispatch(deleteSong(deleteSongConfirm))
        return deleteSongConfirm
    }
    else{
        return "thunk delete song error"
    }

}

export const thunkUpdateSong = (song) => async (dispatch) => {
    const {
      id,
      title,
      artist,
      album,
      release_date,
      genre,
      preview_img,
      song_url,
    } = song;

    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          artist,
          album,
          release_date,
          genre,
          preview_img,
          song_url,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the song.');
      }

      const updatedSong = await response.json();
      dispatch(updateSong(updatedSong));
      return updatedSong;
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };





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
            const newSongState = {...state}
            delete newSongState[action.payload]
            return newSongState
        }

        default:
            return state
    }
}
export default songReducer;
