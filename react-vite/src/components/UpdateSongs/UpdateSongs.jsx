import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchSongsById, thunkUpdateSong, thunkFetchSongs } from '../../redux/songs';
import './UpdateSongs.css';
import { ToastContainer, toast } from "react-toastify";


const UpdateSong = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parsedSongId = parseInt(songId);
    const song = useSelector(state => state.songs[parsedSongId]);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [previewImg, setPreviewImg] = useState(null);
    const [songUrl, setSongUrl] = useState(null);

    useEffect(() => {
        if (parsedSongId) {
            dispatch(thunkFetchSongsById(parsedSongId));
        }
    }, [dispatch, parsedSongId]);

    useEffect(() => {
        if (song) {
            setTitle(song.title || '');
            setArtist(song.artist || '');
            setAlbum(song.album || '');
            setGenre(song.genre || '');
            setReleaseDate(song.release_date);
        }
    }, [song]);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'artist':
                setArtist(value);
                break;
            case 'album':
                setAlbum(value);
                break;
            case 'release_date':
                setReleaseDate(value);
                break;
            case 'genre':
                setGenre(value);
                break;
            case 'preview_img':
                if (type === 'file' && files.length > 0) {
                    setPreviewImg(files[0]);
                }
                break;
            case 'song_url':
                if (type === 'file' && files.length > 0) {
                    setSongUrl(files[0]);
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('album', album);
        formData.append('release_date', releaseDate);
        formData.append('genre', genre);
        if (previewImg) {
            formData.append('preview_img', previewImg);
        }
        if (songUrl) {
            formData.append('song_url', songUrl);
        }
        const updatedSong = await dispatch(thunkUpdateSong(formData, parsedSongId));
        dispatch(thunkFetchSongs())
        toast.success("Successfully updated song", {
            onClose: () => navigate(`/`)
        });
    };

    return (
        <div className="update-song-form">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={title} onChange={handleChange} />

                <label htmlFor="artist">Artist:</label>
                <input type="text" id="artist" name="artist" value={artist} onChange={handleChange} />

                <label htmlFor="album">Album:</label>
                <input type="text" id="album" name="album" value={album} onChange={handleChange} />

                <label htmlFor="release_date">Release Date:</label>
                <input type="date" id="release_date" name="release_date" value={releaseDate} onChange={handleChange} />

                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" value={genre} onChange={handleChange} />

                <label htmlFor="preview_img">Preview Image:</label>
                <input type="file" id="preview_img" name="preview_img" onChange={handleChange} />

                <label htmlFor="song_url">Song URL:</label>
                <input type="file" id="song_url" name="song_url" onChange={handleChange} accept="audio/*" />

                <button type="submit">Update Song</button>
            </form>
        </div>
    );
};

export default UpdateSong;
