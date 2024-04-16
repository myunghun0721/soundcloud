import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchUser } from "../../redux/user";

const UserProfile = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users[userId]);

    useEffect(() => {
        dispatch(thunkFetchUser(userId));
    }, [dispatch, userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to your user profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>City: {user.city}</p>
            <p>Country: {user.country}</p>
            <p>Bio: {user.bio}</p>
        </div>
    );
}

export default UserProfile;
