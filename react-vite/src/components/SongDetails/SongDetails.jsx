import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkFetchSongById } from "../../redux/songs"
import { useParams } from 'react-router-dom'

import "./SongDetails.css"


const SongDetails = () => {
    // Get songId from the url
    const {songId} = useParams()

    const  dispatch = useDispatch()
    //Error state
    const [errors, setErrors] = useState({})

   // fetch the song by it id from backend server
    useEffect (() => {
        dispatch(thunkFetchSongById(parseInt(songId)))
        .then(song => {
            if(song.message){
                setErrors(song)
            }
            
            
        }

        )
    },[dispatch, songId])

    const song = useSelector(state => state.songs[songId])
    let releaseDate = song?.release_date
    releaseDate = new Date(releaseDate).toLocaleDateString("en-US", {
        year:"numeric",
        month:"long",
        day:"numeric"
    })
    

    return (
        <div>
        <h1>{song?.title}</h1>
        <h3>{song?.artist}</h3>
        <h3>{song?.genre}</h3>
        <h3>{song?.album}</h3>
        <h3>{releaseDate}</h3>
        {errors.message && <h1>{errors.message}</h1>}
        </div>
    )
}

export default SongDetails