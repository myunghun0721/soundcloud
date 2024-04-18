import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchPlaylists } from "../../../redux/user";
import './userPlaylists.css';

const UserPlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.users.playlists);

    useEffect(() => {
        dispatch(thunkFetchPlaylists());
    }, [dispatch]);

    return (
        <div className="user-playlists-container">
            <h2>User Playlists</h2>
            {playlists ? (
                <div className="playlists-grid">
                    {playlists.map(playlist => (
                        <div key={playlist.id} className="playlist-item">
                            <img src='https://placehold.co/400' alt={`Playlist Cover for ${playlist.preview_img}`} />
                            <div className="playlist-details">
                                <div className="playlist-title">{playlist.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading-text">Loading playlists...</p>
            )}
        </div>
    );
};

export default UserPlaylists;
