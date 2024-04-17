import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchSongById } from "../../redux/songs"
import { thunkFetchComments } from "../../redux/comments"
import { thunkFetchLikes } from "../../redux/likes"
import { useParams } from 'react-router-dom'


import "./SongDetails.css"


const SongDetails = () => {
    // Get songId from the url
    const {songId} = useParams()
    const  dispatch = useDispatch()
    //Error state
    const [errors, setErrors] = useState({})
    // Retrieve song from redux store
    const song = useSelector(state => state.songs[songId])
    //Retrieve comments from redux store
    const commentsObj = useSelector(state => state.comments)
    const comments = Object.values(commentsObj)
    // Retrieve likes from redux store
    const likesObj = useSelector(state => state.likes)
    const likes = Object.values(likesObj)

   // fetch the song by it id from backend server
    useEffect (() => {
        //Retrieve song base on song id
        dispatch(thunkFetchSongById(parseInt(songId)))
        // Retrieve backend message if there is no id match for song
        .then(song => {
            if(song.message){
                setErrors(song)
            }
        })
        // Retreview comments of the Song
        dispatch(thunkFetchComments(parseInt(songId)))
        dispatch(thunkFetchLikes(parseInt(songId)))

    },[dispatch, songId])


    let releaseDate 
    // if song exist. Format the relase date
    if (song){
        releaseDate = song.release_date
        releaseDate = new Date(releaseDate).toLocaleDateString("en-US", {
            year:"numeric",
            month:"long",
            day:"numeric"
        })

    }
    
    console.log(releaseDate)
    

    return (
        <div>
            <h1>{song?.title}</h1>
            <h3>{song?.artist}</h3>
            <h3>{song?.genre}</h3>
            <h3>{song?.album}</h3>
            <h3>likes: {likes}</h3>
            {releaseDate && <h3>{releaseDate}</h3>}
            {errors.message && <h1>{errors.message}</h1>}
            <section>
                <h3>Comments</h3>
                {comments?.map(comment => (
                    <p key={comment.id}>{comment.body}</p>
                ))}

            </section>
        </div>
    )
}

export default SongDetails