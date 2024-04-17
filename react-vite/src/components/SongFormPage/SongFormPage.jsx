import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import "./SongFormPage.css"


function SongFormPage() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [genre, setGenre] = useState("")
  const [releaseDate, setReleaseDdate] = useState()
  const [previewImg, setPreviewImg] = useState()
  const [song, setSong] = useState()
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault();


    const errObj = {}
    if(!title.length) errObj.title = "title required"
    if(!artist.length) errObj.artist = "artist required"
    if(!album.length) errObj.album = "album required"
    if(!releaseDate) errObj.releaseDate = "releaseDate required"
    if(!genre.length) errObj.genre = "genre required"
    if(!previewImg) errObj.previewImg = "previewImg required"
    if(!song) errObj.song = "song required"

    if(Object.values(errObj).length){
      setError(errObj)
    }
    else{
      setImageLoading(true)
      const formData = new FormData()

      formData.append('title', title)
      formData.append('artist', artist)
      formData.append('album', album)
      formData.append('release_date', releaseDate)
      formData.append('genre', genre)
      formData.append('preview_img', previewImg)
      formData.append('song_url', song)


      // dispatch(thunkUploadSongs(formData))

      setImageLoading(false)
      for (const value of formData.values()) {
        console.log(value);
      }
      console.log("🚀 ~ handleSubmit ~ formData:", formData)
      setError({})
    }
    // const formSubmit = {
    //   title,
    //   artist,
    //   releaseDate,
    //   genre,
    //   // previewImg,
    //   // song
    // }
    // console.log("🚀 ~ handleSubmit ~ formSubmit:", formSubmit)

  }

  return (
    <div className="song-form">
      <form className="form-uploadsong" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" placeholder={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Artist:
          <input type="text" name="artist" placeholder={"artist"} value={artist} onChange={(e) => setArtist(e.target.value)} />
        </label>
        <br />
        <label>
          Album:
          <input type="text" name="album" placeholder={"album"} value={album} onChange={(e) => setAlbum(e.target.value)} />
        </label>
        <br />
        <label>
          Release Date:
          <input type="date" name="releaseDate" onChange={(e) => setReleaseDdate(e.target.value)} />
        </label>
        <br />
        <label>
          Genre:
          <input type="text" name="genre" placeholder={"genre"} value={genre} onChange={(e) => setGenre(e.target.value)} />
        </label>
        <br />
        <label>
          Preview image:
          <input type="file" name="previewImg" onChange={(e) => setPreviewImg(e.target.files[0])} accept="image/*" />
        </label>
        <br />
        <label>
          Song:
          <input type="file" name="song" onChange={(e) => setSong(e.target.files[0])} accept="audio/*"/>
        </label>
        <br />


        {/* <button type="submit" disabled={Object.values(error).length > 0}>Upload a Song</button> */}
        <button type="submit" >test</button>
        {(imageLoading)&& <p>Loading...</p>}
        {Object.values(error).length > 0 && Object.values(error).map((msg) => <p key={msg} className="submit-errors">{msg}</p>)}
      </form>
    </div>
  );
}

export default SongFormPage;
