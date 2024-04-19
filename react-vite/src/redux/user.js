export const LOAD_USER = 'user/loadUser';
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_PLAYLISTS = '/FETCH_PLAYLISTS'
export const CREATE_PLAYLISTS = 'playlist/createPlaylists'
export const DELETE_PLAYLISTS = 'playlist/deletePlaylists'

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
export const deletePlaylists = playlists => ({
    type: DELETE_PLAYLISTS,
    payload: playlists
})

//thunk for fetch user
export const thunkFetchUser = () => async dispatch => {

    const response = await fetch(`/api/users/current`);
    if (response.ok) {
        const user = await response.json();
        console.log("response", response)
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
        dispatch(deletePlaylists(deletePlaylistConfirm))
        return deletePlaylistConfirm
    }
    else {
        return "thunk delete song error"
    }

}
const initialState = {
    users: null,
    songs: [],
    playlists: []
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
        case CREATE_PLAYLISTS: {
            const newPlaylistsState = { ...state }
            newPlaylistsState[action.payload.id] = action.payload
            return newPlaylistsState
        }
        case DELETE_PLAYLISTS: {
            const newSongState = { ...state }
            delete newSongState[action.payload]
            return newSongState
        }
        default:
            return state;
    }
};

export default userReducer
