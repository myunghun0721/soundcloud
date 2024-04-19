import { useState } from 'react'
import './SongDetailsHeader.css'
import WaveForm from './WaveForm'

const SongDetailsHeader = ({song,user}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <main className='song-details-header'>
             <button className="play-button" onClick={togglePlay}>
                {isPlaying? (
                    <div className="pause-icon">
                         <div className="pause-bar"></div>
                         <div className="pause-bar"></div>
                    </div>
                ) : <div className="play-icon"></div>}
                {/* <div className="play-icon"></div> */}
            </button>
            <section className='song-info-container'>
                <h1 className='song-title-details'>{song.title} - {song.artist}</h1>
                <h1 className='song-title-details-2'>{user.username}</h1>
                <WaveForm url= {song.song_url} isPlaying={isPlaying} togglePlay={togglePlay} />
            </section>
            {/* <WaveForm url= {song.song_url} /> */}
            <section className='song-image-container'>
                <img src={song.preview_img} alt={song.title} className='song-image' />
            </section>
            {/* <WaveForm url= {song.song_url} /> */}
            
        </main>
    )
}

export default SongDetailsHeader