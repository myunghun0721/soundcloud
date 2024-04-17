export const LOAD_USER = 'user/loadUser';
export const FETCH_SONGS = 'FETCH_SONGS'

export const loadUser = user => ({
    type: LOAD_USER,
    payload: user
});

export const fetchSongs = songs => ({
    type: FETCH_SONGS,
    payload: songs
})

//thunk for fetch user
export const thunkFetchUser = (userId) => async dispatch => {

        const response = await fetch(`/api/users/${userId}`);
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


const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case FETCH_SONGS:
            return {
                ...state,
                songs:action.payload
            }
        default:
            return state;
    }
};

export default userReducer
