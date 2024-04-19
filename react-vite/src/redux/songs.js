const LOAD_SONGS = 'songs/loadSongs';
const FETCH_SONGS_BY_ID = "FETCH_SONGS_BY_ID"
const UPDATE_SONG = "UPDATE_SONG"

export const loadSongs = songs => ({
    type: LOAD_SONGS,
    payload: songs
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

export const thunkFetchSongs = () => async dispatch => {
    const res = await fetch('/api/songs/')

    if(res.ok){
        const songs = await res.json()
        dispatch(loadSongs(songs))
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

        default:
            return state
    }
}
export default songReducer;
