import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import './CreatePlaylistModal.css'
import { useEffect, useState } from 'react';
import { thunkCreatePlaylists, thunkFetchPlaylists } from '../../redux/user';
import { FaCamera } from "react-icons/fa";
import AddPlaylistModal from '../AddPlaylistModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function CreatePlaylistModal({ songId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.users.playlists);
    const [title, setTitle] = useState("")
    const [previewImg, setPreviewImg] = useState()
    const [error, setError] = useState({})


    const [imageLoading, setImageLoading] = useState(false);


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
                    <OpenModalMenuItem
                        itemText="Add song"
                        //     onItemClick={closeMenu}
                        modalComponent={<AddPlaylistModal  songId={songId}/>}
                    />
                </button>
                <button className='create-option'>
                    Add to playlist
                </button>

            </div>
            <div className='create-playlist'>
                <div className='playlist-form'>
                    <form className='create-form' onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" name="title" placeholder={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        {error.title && <h5>{error.title}</h5>}
                        <label className='upload-img'>
                            <FaCamera />
                            Upload image
                            <input type="file" name="previewImg" onChange={(e) => setPreviewImg(e.target.files[0])} accept="image/*" />
                        </label>
                        {error.previewImg && <h5>{error.previewImg}</h5>}
                        <div className="submit-div">
                            {/* <button>submit</button> */}
                            <button type="submit" disabled={Object.values(error).length > 0}>Create playlist</button>
                            {(imageLoading) && <p>Loading...</p>}
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
}


export default CreatePlaylistModal;
