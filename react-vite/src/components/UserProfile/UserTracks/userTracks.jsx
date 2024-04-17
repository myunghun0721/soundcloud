import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchSongs } from "../../redux/user";

const UserTracks = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.users.songs);

    useEffect(() => {
        dispatch(thunkFetchSongs());
    }, [dispatch]);

    // Render the songs
    return (
        <div>
            <h2>User Songs</h2>
            {songs ? (
                <ul>
                    {songs.map(song => (
                        <li key={song.id}>
                            {song.title} by {song.artist}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading songs...</p>
            )}
        </div>
    );
};

export default UserTracks;
