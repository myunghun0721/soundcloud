export const LOAD_USER = 'user/loadUser';
export const FETCH_SONGS = 'FETCH_SONGS'
export const FETCH_PLAYLISTS = '/FETCH_PLAYLISTS'
export const FETCH_LIKES = '/FETCH_LIKES'

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
            console.log("response", response)
            dispatch(loadUser(user));
        }
};

export const thunkFetchSongs = () => async dispatch => {
    const response = await fetch('/api/songs/user/current')
    if (response.ok){
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
                songs:action.payload
            }
        case FETCH_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
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
