import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchSongs } from "../../redux/songs"
import "./HomePage.css"
import { NavLink, useNavigate } from "react-router-dom"
import { FaCirclePlay } from "react-icons/fa6";
// import Footer from "../Footer"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function HomePage() {
  const dispatch = useDispatch();
  const songObj = useSelector(state => state.songs)
  const songs = Object.values(songObj)
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    dispatch(thunkFetchSongs())
  }, [dispatch, selectedSong])

  function playSong(song) {
    setSelectedSong(song);
  }

  return (
    <div className="all-songs">
      <h1>SoundCloud Songs</h1>
      <div className="song-grid">
        {songs.map((song) => (
          <div className="grid-item" key={song.id}>
            <div className="img-div">
              <div onClick={() => playSong(song)} className="play">
                <FaCirclePlay />
              </div>
              <img src={song.preview_img ? song.preview_img : "../../public/soundcloud-icon.png"} alt="" />
              {/* <img src={"../../public/soundcloud-icon.png"} alt="" /> */}
            </div>
            <div className="song-info">
              <NavLink to={"/songs/" + song.id}>
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <br></br>

      {selectedSong && (
        <div className="footer">
          <AudioPlayer
            autoPlay
            // src={selectedSong.song_url}
            src={selectedSong.song_url ? selectedSong.song_url : "../../public/demosong.mp3"}
            onPlay={(e) => console.log(e)}
          // other props here
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
