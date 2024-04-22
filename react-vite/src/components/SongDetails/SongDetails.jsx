import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadSongs, thunkFetchSongById } from "../../redux/songs"
import { clearComment, editComment, thunkEditComment, thunkFetchComments } from "../../redux/comments"
import { clearLikes, thunkFetchLikes } from "../../redux/likes"
import { useParams } from 'react-router-dom'
import SongDetailsHeader from "../SongDetailsHeader/SongDetailsHeader"
import { thunkPostComment } from "../../redux/comments"
import { thunkDeleteComment } from "../../redux/comments"
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import {ToastContainer, toast} from 'react-toastify'
import LikeButton from "./LikeButton"
import { thunkFetchUser } from "../../redux/user"



import "./SongDetails.css"
// import CreatePlaylistModal from "../CreatePlaylistModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import AddPlaylistModal from "../AddPlaylistModal"
import LoginFormModal from "../LoginFormModal"


const SongDetails = () => {
    // Get songId from the url
    const { songId } = useParams()
    const dispatch = useDispatch()
    //Error state
    const [errors, setErrors] = useState({})
    // Retrieve song from redux store

    // if song id is invalid it will return undefined
    // because during the normalization process in the Redux store if not match
    // Song Id was found
    const song = useSelector(state => state.songs[songId])
    // Retrivew currenUser info
    //Retrieve comments from redux store
    const commentsObj = useSelector(state => state.comments)
    const comments = Object.values(commentsObj)
    // Retrieving the user from redux store
    const user = useSelector(state => state.session.user)
    // Retrieve likes from redux store
    const likesObj = useSelector(state => state.likes)
    const likesOfSong = likesObj.likeCounts
    



    
    const likeCount = likesOfSong[songId]


    // if song is invalid i
    const likeCountNumber = typeof likeCount === "number" ? likeCount : 0
        // comment field state
        const [newComment, setNewComment] = useState('')
        // this is for state is for which order to sort for the comment

        // note also this state right here is the reason why the component re render
        // when we chang the order without using sortedComment 
        const [orderSort, setOrderSort] = useState('newest')

        //state to show login modal when click post with
        const [showLogin, setShowLogin] = useState(false)

        //Cofirm delete display for comment
        const [deleteConfirmCommentId, setDeleteConfirmCommentId] = useState(null)


        //edit comment state
        const [editCommentId, setEditCommentId] = useState(null)
        const [editCommentText, setEditCommentText] = useState("")

        // edit useRef
        const editCommentRef = useRef()
        

        // toggle the edit comment input field
        const toggleEditComment = (comment) => {

            // this clear the state if it clicked again meaning will clear the state 
            // and close the edit mod down
            if (editCommentId === comment.id) {
                setEditCommentId(null)
                setEditCommentText("")
            }
            else {
                setEditCommentId(comment.id)
                setEditCommentText(comment.body)
            }
        }
        useEffect(() => {
            if(editCommentId && editCommentRef.current){
                editCommentRef.current.focus()
            }
        },[editCommentId])
        // toggle the confirm display
        const toggleConfirm = (e, commentId) => {
            // stop propagation this event to bubble up
             e.stopPropagation()
            // set the state base on condition of prev id == the current comment id return null
            // meaning close the confirm box
            setDeleteConfirmCommentId(prevCommentId => (prevCommentId === commentId ? null : commentId))
            
        }

       const  confirmDeleteRef = useRef()
        // this function will set the showConfirm to false  if it user click outside of that confirm box
        
        // use the event lister to track the mouse click if user click outside of the confirm box the box display will be off
        useEffect(() => {
            const handleClickOutside = (e) => {
                // check if there is a confirm box open and a valid element and if the user click outside of the confirm
                // element it will close the confirm box by set the state to null
                if( deleteConfirmCommentId !== null &&confirmDeleteRef.current  && !confirmDeleteRef.current.contains(e.target)){
                    setDeleteConfirmCommentId(null);
                
                    // put it null value instead of !showConfirm because we just want display off
                    
                }
            }
            // check if the confirm box open if it is add the event listener on it
            if(deleteConfirmCommentId !== null){
                document.addEventListener("click", handleClickOutside)
            }       
            return () => {
                //clean up the event listner 
                document.removeEventListener("click", handleClickOutside)
            }
        }, [deleteConfirmCommentId])


        //handle comment input value change
        const handleCommentChange = (e)=> {
            setNewComment(e.target.value)
        }
        // handling comment posting and save edit comment
        const submitComment = ()=> {
            //order is matter here
            // if this state is not null meaning user wanna edit this comment
            if(editCommentId){
                // access the comment from redux commentObject dereived
                 const commentToUpdate = commentsObj[editCommentId]
                //if that comment exist update the local state first 
                 if(commentToUpdate){
                    const updatedComment = {...commentToUpdate, body:editCommentText}
                    // updating the local state by disptach the action creator
                    dispatch(editComment(updatedComment))
                    // then send update to the backend
                    dispatch(thunkEditComment(songId,editCommentId, editCommentText))
                        .then(()=> {
                            toast.success("Comment updated successfully")
                            console.log("Comment updated success")
                        })
                        .catch(error => {
                            toast.error("Failed to update the comment")
                            console.error("Failed to update the comment:", error)
                            dispatch(editComment(commentToUpdate))
                        })

                    // clear the state
                    setEditCommentId(null)
                    setEditCommentText(null)
                 }

            }
            
            else if(user) {
                dispatch(thunkPostComment(songId, newComment))

                setNewComment('')
            
            }
        
            else {
                setShowLogin(true)
            }

        }
        const deleteComment = (commentId) => {
            dispatch(thunkDeleteComment(songId,commentId))
                .then(()=> {
                    toast.success("Delete successfully")
                })
                .catch(error => {
                    toast.error("Failed to delete comment")
                    console.error("delete failed", error)
                })
            setDeleteConfirmCommentId(null)
            setEditCommentId(null)
            setEditCommentText(null)
        
        }
        // Handling sort onclick
        const handleOrderToSort = (order) => {
            setOrderSort(order)
        }

        // perform in place sort for comment array
        const sortedComment = comments.sort((a,b) => {
            if(orderSort === "newest"){
                return new Date(b.created_at) - new Date(a.created_at);

            }
            else {
                return new Date(a.created_at) - new Date(b.created_at)
            }
        })


    // fetch the song by it id from backend server
    useEffect(() => {
       
        //Retrieve song base on song id
        if(!song) {
            dispatch(thunkFetchSongById(parseInt(songId)))
            // Retrieve backend message if there is no id match for song
            .then(data => {
                if(data.message){
                    // console.log("from component",data)
                    setErrors(data)
                }
            })
        }
        dispatch(clearLikes())
        // get all user content if logged in
        // Retrieve comments of the Song
        dispatch(thunkFetchComments(parseInt(songId)))
        dispatch(thunkFetchLikes(parseInt(songId)))
        // add this cleanup function to when navigate away or the song id changed
        return () => {
            dispatch(clearComment())
        }

    }, [dispatch, songId])

    // console.log(likeCount)
    // console.log(song)


    if (!song) {
        // return <h1>No song found.</h1>
        return <h1>{errors.message}</h1>
    }

    //  Format the relase date

    let releaseDate
    releaseDate = song.release_date
    releaseDate = new Date(releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
let commentCount  = comments.length


    return (
        <div className="song-details-container">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <SongDetailsHeader song={song} releaseDate={releaseDate} user ={user}/>
            <section className="comment-input-container">
                <div className="avatar-holder">
                    <img src="https://res.cloudinary.com/dzuhij5io/image/upload/v1713557207/Screenshot_2024-04-19_at_13.06.27_j4ft5n.png" alt="nothing" className="avatar" />
                </div>
                <input type="text" value={newComment} onChange={handleCommentChange} className="comment-input" placeholder="Write your comment"/>
                { !showLogin && user ? (<button className={newComment.length > 1 ?  "send-button" : "hide-send-button"} onClick={submitComment}>POST</button>) :
                ( <OpenModalMenuItem className={"post-button-song-detail"} itemText={<button className="send-button">POST</button>} modalComponent={<LoginFormModal  />} onModalClose={() => setShowLogin(false)}/>)}
            </section>
            <div className="like-div">
                {user &&
                    <div className="like-playlist-container">
                        <button className="add-playlist">
                        <OpenModalMenuItem
                            className={"add-playlist-button"}
                            itemText="Add to playlist"
                        //     onItemClick={closeMenu}
                            modalComponent={<AddPlaylistModal songId={song.id} />}
                        />
                    </button>
                         <LikeButton className={"like-song-button"} user={user} songId={songId}/>
                    </div>
                    }
                
                <h3 className="like-count">likes: {likeCountNumber}</h3>
            </div>

            {errors.message && <h1>{errors.message}</h1>}
            <hr />
            <div className="commnent-sorting">
                        <select className="select-sort" value={orderSort} onChange={(e)=> handleOrderToSort(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
            </div>
            {comments && <section className="comment-section">
                {/* This condition is for when coment count is less than 1 it remove the plural  */}
            <h3>{commentCount} {`comment${commentCount > 1 ? 's': '' }`}:</h3>
                    {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id}>
                            {editCommentId === comment.id ? (
                            <input ref={editCommentRef} className="comment-text-edit" value={editCommentText} onChange={e => setEditCommentText(e.target.value)}/>
                            
                            
                            ):
                             <p  className="comment-text">{comment.body}</p>}
                        

                    {/* if user is logged in and user id match comment.user_id will display the delete button for that comment */}
                        {user && user.id == comment.user_id && (
                            <div>
                                {/* using toggle function to handle button click also passing down the comment.id */}
                                {/* <button onClick={(e) => toggleConfirm(e, comment.id)} className="delete-button">Delete</button> */}
                                { editCommentId === comment.id ? (
                                    <div className="save-cancel">
                                        <button onClick={submitComment}>Save</button>
                                        <button onClick={toggleEditComment}>Cancel</button>
                                    </div>
                                )
                                  :(
                                    <div className="edit-delete">
                                        <button onClick={(e) => toggleConfirm(e, comment.id)} className="delete-button">Delete</button>
                                        <button onClick={()=> toggleEditComment(comment)}>Edit</button>
                                    
                                    
                                    </div>
                                  
                                  )}
                                {/* condition check for if the id of delete confirm comment state match with the current comment id will display the confirm box */}
                                {deleteConfirmCommentId === comment.id && (
                                    <div className="confirm-delete" ref={confirmDeleteRef}>
                                        <p>Do you really want to delete this comment?</p>
                                        <button onClick={() => deleteComment(comment.id)}>Yes</button>
                                        <button onClick={()=> setDeleteConfirmCommentId(null)}>Cancel</button>

                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    ))
                    // if there is no comment will display No comment yet
                ) : (
                    <p>No comments yet.</p>
                )}

            </section>}

            
        </div>
    )
}

export default SongDetails
