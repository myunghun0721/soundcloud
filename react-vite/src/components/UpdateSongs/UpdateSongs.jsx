import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkFetchSongsById, thunkUpdateSong } from './thunkActions'; // Adjust the import path as needed

const SongEditor = ({ songId }) => {
    const dispatch = useDispatch();
    const [song, setSong] = useState({
        title: '',
        artist: '',
        album: '',
        release_date: '',
        genre: '',
        preview_img: '',
        song_url: ''
    });

    useEffect(() => {
        const fetchSong = async () => {
            const action = thunkFetchSongsById(songId);
            const fetchedSong = await dispatch(action); // Ensure your fetch thunk actually returns the song
            setSong(fetchedSong || {});
        };

        fetchSong();
    }, [dispatch, songId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(thunkUpdateSong(song));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={song.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="artist" value={song.artist} onChange={handleChange} placeholder="Artist" />
            <input type="text" name="album" value={song.album} onChange={handleChange} placeholder="Album" />
            <input type="date" name="release_date" value={song.release_date} onChange={handleChange} />
            <input type="text" name="genre" value={song.genre} onChange={handleChange} placeholder="Genre" />
            <input type="text" name="preview_img" value={song.preview_img} onChange={handleChange} placeholder="Preview Image URL" />
            <input type="text" name="song_url" value={song.song_url} onChange={handleChange} placeholder="Song URL" />
            <button type="submit">Update Song</button>
        </form>
    );
};

export default SongEditor;
