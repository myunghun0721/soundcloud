
import { deleteSongStore } from "./songs";


export const LOAD_USER = 'user/loadUser';
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_PLAYLISTS = '/FETCH_PLAYLISTS'

export const CREATE_PLAYLISTS = 'playlist/createPlaylists'
export const DELETE_PLAYLISTS = 'playlist/deletePlaylists'
export const ADD_SONG_TO_PLAYLISTS = 'playlist/addSongToPlaylists'
const DELETE_SONG = "/user/songs/delete"



export const FETCH_LIKES = '/FETCH_LIKES'


export const deleteSong = (songId, deleteSongConfirm) =>({
    type: DELETE_SONG,
    payload: {
        songId,
        deleteSongConfirm
    }
})

export const loadUser = user => ({
    type: LOAD_USER,
    payload: user
});

export const fetchSongs = songs => ({
    type: FETCH_SONGS,
    payload: songs
})

export const fetchPlaylists = playlists => ({
    type: FETCH_PLAYLISTS,
    payload: playlists
})
export const createPlaylists = playlists => ({
    type: CREATE_PLAYLISTS,
    payload: playlists
})
export const deletePlaylists = (playlists,playlistId) => ({
    type: DELETE_PLAYLISTS,
    payload: {
        playlists,
        playlistId
    }
})

export const addSongToPlaylist = id => ({
    type: ADD_SONG_TO_PLAYLISTS,
    playload: id
})

export const fetchLikes = likes => ({
    type: FETCH_LIKES,
    payload: likes
})

export const thunkFetchLikes= () => async dispatch => {
    const response = await fetch('/api/song/likes/user/current');
    if (response.ok) {
        const likes = await response.json()
        console.log("response", response)
        dispatch(fetchLikes(likes))
    }
}

//thunk for fetch user
export const thunkFetchUser = () => async dispatch => {

    const response = await fetch(`/api/users/current`);
    if (response.ok) {
        const user = await response.json();
        dispatch(loadUser(user));
    }
};

export const thunkFetchSongs = () => async dispatch => {
    const response = await fetch('/api/songs/user/current')
    if (response.ok) {
        const songs = await response.json();
        dispatch(fetchSongs(songs))
    }
}

export const thunkFetchPlaylists = () => async dispatch => {
    const response = await fetch('/api/playlists/user/current');
    if (response.ok) {
        const playlists = await response.json();
        dispatch(fetchPlaylists(playlists));
    }
};
// delete song
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
        dispatch(deleteSongStore(songId, deleteSongConfirm))
        return deleteSongConfirm
    }
    else{
        return "thunk delete song error"
    }

}

export const thunkCreatePlaylists = (playlists) => async dispatch => {
    const res = await fetch('/api/playlists/new', {
        method: 'POST',
        body: playlists
    })
    if (res.ok) {
        const playlists = await res.json()
        dispatch(createPlaylists(playlists))
        return playlists
    }
    else {
        return "playlists thunk error"
    }
}
export const thunkDeletePlaylists = (playlistId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const deletePlaylistConfirm = await res.json()
        dispatch(deletePlaylists(deletePlaylistConfirm,playlistId))
        return deletePlaylistConfirm
    }
    else {
        return "thunk delete song error"
    }

}
export const thunkAddSongToPlaylist = (playlistId, songId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/song/${songId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const addSong = await res.json()
        dispatch(addSongToPlaylist(addSong))
        return addSong
    }
    else {
        return "thunk add song to playlist error"
    }

}
const initialState = {
    users: null,
    songs: [],
    playlists: [],
    likes: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                users: action.payload
            };
        case FETCH_SONGS:
            return {
                ...state,
                songs: action.payload
            }
        case FETCH_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        case DELETE_PLAYLISTS: {
            const message = action.payload.playlists.message
            if(message === "delete successful"){
            const newPlaylist = state.playlists.filter(playlist => playlist.id !== action.payload.playlistId)
            return {
                ...state,
                playlists: newPlaylist
            }
        }
    
        return {...state}
        }
        case DELETE_SONG: {
            if(action.payload.deleteSongConfirm.message === "delete successful"){
                const newSongs = state.songs.filter(song => song.id !== action.payload.songId)
                return {
                    ...state,
                    songs: newSongs
                }
               
            }
            return {...state}
        }
        case FETCH_LIKES:
            return {
                ...state,
                likes: action.payload
            }
        default:
            return state;
    }
};

export default userReducer
