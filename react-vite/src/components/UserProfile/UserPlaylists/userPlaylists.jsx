import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchPlaylists } from "../../../redux/user";
import './userPlaylists.css';
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
// import DeleteSongModal from "../../DeleteModal";
import DeletePlaylistModal from "../../DeletePlaylistModal";

const UserPlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.users.playlists);

    console.log(playlists)

    useEffect(() => {
        dispatch(thunkFetchPlaylists());
    }, [dispatch]);

    if(playlists.message === "song not found"){
        return <>
        <h1 style={{textAlign: "center"}}>No Playlists Yet</h1>
        </>
    }

    return (
        <div className="user-playlists-container">
            <h2>User Playlists</h2>
            {playlists ? (
                <div className="playlists-grid">
                    {playlists.map(playlist => (
                        <div key={playlist.id} className="playlist-item">
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
