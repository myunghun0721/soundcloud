import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import "./SongFormPage.css"
import { thunkUploadSongs } from "../../redux/songs";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify"

function SongFormPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [genre, setGenre] = useState("")
  const [releaseDate, setReleaseDdate] = useState()
  const [previewImg, setPreviewImg] = useState()
  const [song, setSong] = useState()
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState({})

  const currentUser = useSelector(state => state.session['user'])

  useEffect(() => {
    if (!currentUser) navigate('/')
  }, [navigate, currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault();


    setImageLoading(true)
    const formData = new FormData()

    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('album', album)
    formData.append('release_date', releaseDate)
    formData.append('genre', genre)
    formData.append('preview_img', previewImg)
    formData.append('song_url', song)

    setImageLoading(false)
    setError({})

      dispatch(thunkUploadSongs(formData)).then(newSong => {
        toast.success("Successfully uploaded song",{
          onClose: ()=> navigate(`/songs/${newSong.id}`)
        })
      
      
      
      })
      


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

  useEffect(() => {
    const errObj = {}
    if (!title.length) errObj.title = "Title required"
    if (!artist.length) errObj.artist = "Artist required"
    if (!album.length) errObj.album = "Album required"
    if (!releaseDate) errObj.releaseDate = "Release date required"
    if (!genre.length) errObj.genre = "Genre required"
    if (!previewImg) errObj.previewImg = "Preview image required"
    if (!song) errObj.song = "Song required"

    setError(errObj)
  }, [title, artist, album, releaseDate, genre, previewImg, song])
  return (
    <div className="song-form">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <form className="form-uploadsong" onSubmit={handleSubmit}>
        <div className="header-div">
          <h1>Upload your song</h1>
        </div>
        <div className="body-div">
          <div className="left-div">
            <label>
              <FaCamera />
              Upload image
              <input type="file" name="previewImg" onChange={(e) => setPreviewImg(e.target.files[0])} accept="image/*" />
            </label>
            {error.previewImg && <h5>{error.previewImg}</h5>}
          </div>
          <div className="right-div">
            <label>
              Title:
              <input type="text" name="title" placeholder={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            {error.title && <h5>{error.title}</h5>}
            <br />
            <label>
              Artist:
              <input type="text" name="artist" placeholder={"artist"} value={artist} onChange={(e) => setArtist(e.target.value)} />
            </label>
            {error.artist && <h5>{error.artist}</h5>}
            <br />
            <label>
              Album:
              <input type="text" name="album" placeholder={"album"} value={album} onChange={(e) => setAlbum(e.target.value)} />
            </label>
            {error.album && <h5>{error.album}</h5>}
            <br />
            <label>
              Release Date:
              <input type="date" name="releaseDate" onChange={(e) => setReleaseDdate(e.target.value)} />
            </label>
            {error.releaseDate && <h5>{error.releaseDate}</h5>}
            <br />
            <label>
              Genre:
              <input type="text" name="genre" placeholder={"genre"} value={genre} onChange={(e) => setGenre(e.target.value)} />
            </label>
            {error.genre && <h5>{error.genre}</h5>}
            <br />
            <label className="select-song">
              <input type="file" name="song" onChange={(e) => setSong(e.target.files[0])} accept="audio/*" />
            </label>
            {error.song && <h5>{error.song}</h5>}
          </div>
        </div>
        <div className="submit-div">
          <button type="submit" disabled={Object.values(error).length > 0}>Upload Song</button>
          {(imageLoading) && <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default SongFormPage;
