const FETCH_SONGS_BY_PLAYLIST_ID = 'FETCH_SONGS_BY_PLAYLIST_ID'

export const fetchByPlaylistId = songs => ({
    type: FETCH_SONGS_BY_PLAYLIST_ID,
    payload: songs
})

export const fetchSongByPlaylistId = (playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/songs`)

    if(res.ok){
        const songs = await res.json()
        dispatch(fetchByPlaylistId(songs))
        return songs
    }
}

const playlistReducer = (state ={}, action) => {
    switch(action.type){
        case FETCH_SONGS_BY_PLAYLIST_ID:
            return {
                ...state,
                [action.payload.songs]: action.payload
            }
    }
}

export default playlistReducer
