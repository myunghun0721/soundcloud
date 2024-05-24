import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchSongs } from "../../redux/songs"
import "./HomePage.css"
import { NavLink } from "react-router-dom"
import { FaCirclePlay } from "react-icons/fa6";
// import Footer from "../Footer"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SearchSong from "./SearchSong";



function HomePage() {
  const dispatch = useDispatch(); 
  const songObj = useSelector(state => state.songs)
  const [searchResult, setSearchResult] = useState([])
  const [selectedSong, setSelectedSong] = useState(null);
  const songs = searchResult.length !== 0 ? searchResult : Object.values(songObj)

  // -----------Search functionality
  const handleSearch = async(query) => {
    const response = await fetch(`/api/songs/search?query=${encodeURIComponent(query)}`)
    const songs = await response.json()
    setSearchResult(songs)


  }


  useEffect(() => {
    dispatch(thunkFetchSongs())
  }, [dispatch, selectedSong])

  function playSong(song) {
    setSelectedSong(song);
  }

  return (
    <div className="all-songs">
    <h1 className="chart-heading">SoundCloud Charts Top 50</h1>
      <SearchSong onSearch={handleSearch}/>
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
            
          // other props here
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
