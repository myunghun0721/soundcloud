import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePlaylistModal.css'
import { thunkDeletePlaylists } from '../../redux/user';


function DeletePlaylistModal({ playlistId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()


    function noButton() {
        closeModal()
    }
    async function yesButton() {
        // console.log(playlistId)
        await dispatch(thunkDeletePlaylists(playlistId))
        closeModal()
    }
    return (
        <div id="deleteModal" className='div-modal-login'>
            <h1>Confirm Delete Playlist</h1>

            <div className="button-confirm">
                <button id="yes" onClick={yesButton}>
                    Yes (DELETE Playlist)
                </button>
                <button id="no" onClick={noButton}>
                    No (Keep Playlist)
                </button>
            </div>
        </div>
    );
}


export default DeletePlaylistModal;
