import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkFetchUser } from "../../redux/user";

const UserProfile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users[userId]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        dispatch(thunkFetchUser(parseInt(userId)));
    }, [dispatch, userId]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to your user profile</h1>
            <button onClick={toggleDetails}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>City: {user.city}</p>
                    <p>Country: {user.country}</p>
                    <p>Bio: {user.bio}</p>
                </div>
            )}

         </div>
    );
}

export default UserProfile;
