import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import './AddPlaylistModal.css'
import { useEffect, useState } from 'react';
import { thunkAddSongToPlaylist, thunkCreatePlaylists, thunkFetchPlaylists } from '../../redux/user';
// import { FaCamera } from "react-icons/fa";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreatePlaylistModal from '../CreatePlaylistModal';
// import { Navigate, useNavigate } from 'react-router-dom';

function AddPlaylistModal({ songId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.users.playlists);
    const [title, setTitle] = useState("")
    const [previewImg, setPreviewImg] = useState()
    const [error, setError] = useState({})


    const [imageLoading, setImageLoading] = useState(false);

    async function addSongPlaylist(playlistId) {
        // await dispatch(thunkDeleteSong(songId))
        // closeModal()
        console.log("playlist id: ", playlistId)
        console.log("song id: ", songId)

        await dispatch(thunkAddSongToPlaylist(playlistId, songId))
        closeModal()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //image loading start
        setImageLoading(true)

        // form data
        const formData = new FormData()

        formData.append('title', title)
        formData.append('preview_img', previewImg)

        // image loading done
        setImageLoading(false)
        setError({})
        //dispatch
        dispatch(thunkCreatePlaylists(formData))
        closeModal();

    }
    useEffect(() => {
        dispatch(thunkFetchPlaylists());
    }, [dispatch]);

    useEffect(() => {
        const errObj = {}
        if (!title.length) errObj.title = "Title required"
        if (!previewImg) errObj.previewImg = "Preview image required"
        setError(errObj)
    }, [title, previewImg])



    return (
        <div id="createModal" className='div-modal-login'>
            <div className='playlist-options'>
                <button className='add-option' >
                    Add Song
                </button>
                <button className='create-option'>
                    <OpenModalMenuItem
                        itemText="Add playlist"
                        //     onItemClick={closeMenu}
                        modalComponent={<CreatePlaylistModal songId={songId}/>}
                    />
                </button>
            </div>

            <div className="user-playlists-container">
                <h2>Add song to the Playlists</h2>
                {playlists ? (
                    <div className="playlists-grid">
                        {playlists.map(playlist => (
                            <div key={playlist.id} className="playlist-item">
                                {/* <img src='https://placehold.co/400' alt={`Playlist Cover for ${playlist.preview_img}`} /> */}
                                <img src={playlist.preview_img ? playlist.preview_img : "../../public/soundcloud-icon.png"} alt={`Playlist Cover for ${playlist.preview_img}`} />
                                <div className="playlist-details">
                                    <div className="playlist-title">{playlist.title}</div>
                                    <button onClick={() => addSongPlaylist(playlist.id)}>Add</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="loading-text">Loading playlists...</p>
                )}
            </div>

        </div>
    );
}


export default AddPlaylistModal;
