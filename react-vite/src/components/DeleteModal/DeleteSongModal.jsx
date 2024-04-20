import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteModal.css'
import { thunkDeleteSong } from '../../redux/songs';


function DeleteSongModal({ songId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch()


    function noButton() {
        closeModal()
    }
    async function yesButton() {

        await dispatch(thunkDeleteSong(songId))
        closeModal()
    }
    return (
        <div id="deleteModal" className='div-modal-login'>
            <h1>Confirm Delete Song</h1>

            <div className="button-confirm">
                <button id="yes" onClick={yesButton}>
                    Yes (DELETE Song)
                </button>
                <button id="no" onClick={noButton}>
                    No (Keep Song)
                </button>
            </div>
        </div>
    );
}


export default DeleteSongModal;
