import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchPlaylists } from "../../../redux/user";
import './userPlaylists.css';
<<<<<<< HEAD
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteSongModal from "../../DeleteModal";
import DeletePlaylistModal from "../../DeletePlaylistModal";
=======
>>>>>>> parent of b545ed1 (b)

const UserPlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.users.playlists);

<<<<<<< HEAD

=======
>>>>>>> parent of b545ed1 (b)
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
<<<<<<< HEAD
                            {/* <img src='https://placehold.co/400' alt={`Playlist Cover for ${playlist.preview_img}`} /> */}
                            <img src={playlist.preview_img ? playlist.preview_img : "../../public/soundcloud-icon.png"} alt={`Playlist Cover for ${playlist.preview_img}`} />
                            <div className="playlist-details">
                                <div className="playlist-title">{playlist.title}</div>
                            </div>
                            <div className="div-button-holder">
                                {/* <button onClick={(e) => updateSong(e, song.id)}><p>Update</p></button> */}

                                <button className="deleteButton">
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        //     onItemClick={closeMenu}
                                        modalComponent={<DeletePlaylistModal playlistId={playlist.id} />}
                                    />
                                </button>
                            </div>
=======
                            <img src='https://placehold.co/400' alt={`Playlist Cover for ${playlist.preview_img}`} />
                            <div className="playlist-details">
                                <div className="playlist-title">{playlist.title}</div>
                            </div>
>>>>>>> parent of b545ed1 (b)
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
