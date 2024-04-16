export const LOAD_USER = 'user/loadUser';

export const loadUser = user => ({
    type: LOAD_USER,
    payload: user
});

export const thunkFetchUser = (id) => async dispatch => {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
            const user = await response.json();
            dispatch(loadUser(user));
        } else {
            console.error("Failed to fetch user, status:", response.status);
            const errorResponse = await response.text();  // This line helps to read the textual response which might indicate what went wrong
            console.error("Error response body:", errorResponse);
            throw new Error(`Failed to fetch user: ${response.status}`);
        }
    } catch (error) {
        console.error('Exception when fetching user:', error);
        throw error;
    }
};


const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
};

export default userReducer
