import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchSongById } from "../../redux/songs"
import { clearComment, thunkFetchComments } from "../../redux/comments"
import { thunkFetchLikes } from "../../redux/likes"
import { useParams } from 'react-router-dom'
import SongDetailsHeader from "../SongDetailsHeader/SongDetailsHeader"
import { thunkPostComment } from "../../redux/comments"
import { thunkDeleteComment } from "../../redux/comments"


import "./SongDetails.css"


const SongDetails = () => {
    // Get songId from the url
    const {songId} = useParams()
    const  dispatch = useDispatch()
    //Error state
    const [errors, setErrors] = useState({})
    // Retrieve song from redux store

    // if song id is invalid it will return undefined 
    // because during the normalization process in the Redux store if not match
    // Song Id was found
    const song = useSelector(state => state.songs[songId])
    //Retrieve comments from redux store
    const commentsObj = useSelector(state => state.comments)
    const comments = Object.values(commentsObj)
    // Retrieving the user from redux store
    const user = useSelector(state => state.session.user)
    console.log("this is the user", user)
    // Retrieve likes from redux store
    const likesObj = useSelector(state => state.likes)
    const { likeCount } = likesObj
    // if song is invalid i
    const likeCountNumber = typeof likeCount === "number" ? likeCount : 0
// comment field state
const [newComment, setNewComment] = useState('')

//handle comment input value change
const handleCommentChange = (e)=> {
    setNewComment(e.target.value)
}
const sumbmitComment = ()=> {
    
    dispatch(thunkPostComment(songId, newComment))

    setNewComment('')

}
const deleteComment = (commentId) => {
    dispatch(thunkDeleteComment(songId,commentId))
}

   // fetch the song by it id from backend server
    useEffect (() => {
        //Retrieve song base on song id
        dispatch(thunkFetchSongById(parseInt(songId)))
        // Retrieve backend message if there is no id match for song
        .then(data => {
            if(data.message){
                // console.log("from component",data)
                setErrors(data)
            }
        })
        // Retrieve comments of the Song
        dispatch(thunkFetchComments(parseInt(songId)))
        dispatch(thunkFetchLikes(parseInt(songId)))
        // add this cleanup function to when navigate away or the song id changed
        return () => {
            dispatch(clearComment())
        }

    },[dispatch, songId])


    

   
    
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
        year:"numeric",
        month:"long",
        day:"numeric"
    })
let commentCount  = comments.length

    return (
        <div className="song-details-container">
            <SongDetailsHeader song={song} releaseDate={releaseDate} user ={user}/>
            <section className="comment-input-container">
                <div className="avatar-holder">
                    <img src="https://res.cloudinary.com/dzuhij5io/image/upload/v1713557207/Screenshot_2024-04-19_at_13.06.27_j4ft5n.png" alt="nothing" className="avatar" />
                </div>
                <input type="text" value={newComment} onChange={handleCommentChange} className="comment-input" placeholder="Write your comment"/>
                <button className="send-button" onClick={sumbmitComment}>POST</button>
            </section>
            
            <h3>likes: {likeCountNumber}</h3>
            
            {errors.message && <h1>{errors.message}</h1>}
            <hr />

            {comments && <section className="comment-section">
            <h3>{commentCount} {`comment${commentCount > 1 ? 's': '' }`}:</h3>
                    {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id}>
                        <p  className="comment-text">{comment.body}</p>
                        {user && user.id == comment.user_id && (
                            <button onClick={() => deleteComment(comment.id)} className="delete-button">Delete</button>
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
