import { useDispatch, useSelector } from "react-redux"
import {useEffect, useState } from "react"
import { thunkAddLike, thunkRemoveLike } from "../../redux/likes"


const LikeButton = ({songId,user, className }) =>{
   
    // Retrieve like from redux state using SongId
    const likesBySong = useSelector(state => state.likes.likesBySong[songId] || [])

    // Checking if user has like the song yet
    const isLiked = likesBySong.some(like => like.user_id === user?.id)

    const dispatch = useDispatch()
    const handAddLike = () => {
        if(!isLiked) {
        dispatch(thunkAddLike(songId))
        }
        else {
            dispatch(thunkRemoveLike(songId))
        }
    }
    return (
        <button  className={className}onClick={handAddLike}>{isLiked ? "Unlike": "Like"}</button>
    )
}
export default LikeButton