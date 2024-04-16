import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {thunkFetchSongs} from "../../redux/songs"
import "./HomePage.css"

function HomePage() {
  const dispatch = useDispatch();
  const songObj = useSelector(state => state.songs)
  const songs = Object.values(songObj)

  useEffect(()=>{
    dispatch(thunkFetchSongs())
  }, [dispatch])
  return (
    <>
      <h1>Test page</h1>
      <p>this is test page</p>
      <div>
        {songs.map(song => {
          // console.log(song)
          return <div key={song.id}>{song.title}</div>
        }
        )}

      </div>

    </>
  );
}

export default HomePage;
