import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchSongById } from "../../redux/songs"
import { clearComment, thunkFetchComments } from "../../redux/comments"
import { thunkFetchLikes } from "../../redux/likes"
import { useParams } from 'react-router-dom'
import SongDetailsHeader from "../SongDetailsHeader/SongDetailsHeader"


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
    // Retrieve likes from redux store
    const likesObj = useSelector(state => state.likes)
    const { likeCount } = likesObj
    // if song is invalid i
    const likeCountNumber = typeof likeCount === "number" ? likeCount : 0

   // fetch the song by it id from backend server
    useEffect (() => {
        //Retrieve song base on song id
        dispatch(thunkFetchSongById(parseInt(songId)))
        // Retrieve backend message if there is no id match for song
        .then(data => {
            if(data.message){
                console.log("from component",data)
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

    return (
        <div>
            <h1>{song.title}</h1>
            <h3>{song.artist}</h3>
            <h3>{song.genre}</h3>
            <h3>{song.album}</h3>
            <h3>likes: {likeCountNumber}</h3>
             <h3>{releaseDate}</h3>
            {errors.message && <h1>{errors.message}</h1>}

            {comments && <section className="comment-section">
            <h3>Comments</h3>
                    {comments.length > 0 ? (
                    comments.map(comment => (
                        <p key={comment.id}>{comment.body}</p>
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