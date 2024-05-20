import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { thunkFetchUser } from "../../redux/user";
import { Link, useLocation } from 'react-router-dom';
import './profile.css';
import UserTracks from "./UserTracks/userTracks";
import UserPlaylists from "./UserPlaylists/userPlaylists";


const PopupForm = ({ user, onClose }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>User Details</h2>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>City: {user.city}</p>
                <p>Country: {user.country}</p>
                <p>Bio: {user.bio}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}


const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.users);
    const location = useLocation();
    const [showTracks, setShowTracks] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [showPlaylists, setShowPlaylists] = useState(false);

    useEffect(() => {
        dispatch(thunkFetchUser());
    }, [dispatch, location]);

    const toggleTracks = (e) => {
        e.preventDefault();
        setShowTracks(!showTracks);
        setShowDetails(false);
        setShowPlaylists(false);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const togglePlaylists = () => {
        setShowPlaylists(!showPlaylists);
        setShowDetails(false);
        setShowTracks(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="https://i.postimg.cc/GmnKv10S/Guitare-Classique5.png" alt="Profile" className="profile-image"/>
                    <h1>Welcome to your user profile, {user.username}</h1>
                </div>
            </div>
            <nav className="profile-nav">
                <Link to="#" onClick={toggleTracks} className="profile-link">
                    {showTracks ? 'Hide Tracks' : 'Show Tracks'}
                </Link>
                <Link to="#" onClick={togglePlaylists} className="profile-link">
                    {showPlaylists ? 'Hide Playlists' : 'Show Playlists'}
                </Link>
                <button onClick={toggleDetails} className="profile-button">
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </nav>
            {showTracks && <UserTracks />}
            {showPlaylists && <UserPlaylists />}
            {showDetails && <PopupForm user={user} onClose={toggleDetails} />}
        </div>
    );
};

export default UserProfile;
