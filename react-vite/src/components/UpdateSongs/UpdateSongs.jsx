import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchSongsById, thunkUpdateSong } from '../../redux/songs';
import './UpdateSongs.css'

const UpdateSong = () => {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const parsedSongId = parseInt(songId);
    const song = useSelector(state => state.songs[parsedSongId]);

    const [songData, setSongData] = useState({
        title: '',
        artist: '',
        album: '',
        release_date: '',
        genre: '',
        preview_img: '',
        song_url: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (parsedSongId) {
            dispatch(thunkFetchSongsById(parsedSongId));
        }
    }, [dispatch, parsedSongId]);

    useEffect(() => {
        if (song) {
            const formattedReleaseDate = new Date(song.release_date).toISOString().split('T')[0];
            setSongData({
                title: song.title || '',
                artist: song.artist || '',
                album: song.album || '',
                release_date: formattedReleaseDate || '',
                genre: song.genre || '',
                preview_img: song.preview_img || '',
                song_url: song.song_url || ''
            });
        }
    }, [song]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSongData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateInputs = () => {
        const errors = {};
        if (!songData.title) errors.title = "Title is required";
        if (!songData.artist) errors.artist = "Artist is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            try {
                await dispatch(thunkUpdateSong({ ...songData, id: parsedSongId }));
                navigate(`/songs/${parsedSongId}`);
            } catch (error) {
                console.error("Error updating song", error);
            }
        }
    };

    return (
        <div className="update-song-form">

        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={songData.title} onChange={handleChange} />
            {errors.title && <p className="error-message">{errors.title}</p>}

            <label htmlFor="artist">Artist:</label>
            <input type="text" id="artist" name="artist" value={songData.artist} onChange={handleChange} />
            {errors.artist && <p className="error-message">{errors.artist}</p>}

            <label htmlFor="album">Album:</label>
            <input type="text" id="album" name="album" value={songData.album} onChange={handleChange} />
            {errors.album && <p className="error-message">{errors.album}</p>}

            <label htmlFor="release_date">Release Date:</label>
            <input type="date" id="release_date" name="release_date" value={songData.release_date} onChange={handleChange} />
            {errors.release_date && <p className="error-message">{errors.release_date}</p>}

            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value={songData.genre} onChange={handleChange} />
            {errors.genre && <p className="error-message">{errors.genre}</p>}

            <label htmlFor="preview_img">Preview Image URL:</label>
            <input type="text" id="preview_img" name="preview_img" value={songData.preview_img} onChange={handleChange} />
            {errors.preview_img && <p className="error-message">{errors.preview_img}</p>}

            <label htmlFor="song_url">Song URL:</label>
            <input type="text" id="song_url" name="song_url" value={songData.song_url} onChange={handleChange} />
            {errors.song_url && <p className="error-message">{errors.song_url}</p>}

            <button type="submit">Update Song</button>
        </form>
        </div>
    );
};

export default UpdateSong;
