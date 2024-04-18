import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchSongs } from "../../redux/songs"
import "./HomePage.css"
import { NavLink } from "react-router-dom"
import { FaCirclePlay } from "react-icons/fa6";


function HomePage() {
  const dispatch = useDispatch();
  const songObj = useSelector(state => state.songs)
  const songs = Object.values(songObj)

  useEffect(() => {
    dispatch(thunkFetchSongs())

  }, [dispatch])

  function playSong(song){

    console.log(song.title)
    console.log(song.song_url)
  }

  return (
    <div className="all-songs">
      <h1>SoundCloud Songs</h1>
      <div className="song-grid">
        {songs.map(song => {
          // console.log(song)
          return <div className='grid-item' key={song.id}>
            <div onClick={()=>playSong(song)} className="img-div">
              <div className="play"><FaCirclePlay /></div>
              <img src="https://placehold.co/400" />
            </div>
            <div className="song-info">
              <NavLink to={"/songs/" + song.id}>
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </NavLink>
            </div>
          </div>
        }
        )}
      </div>
    </div>

  );
}

export default HomePage;
