import { useState } from 'react'
import './SongDetailsHeader.css'
import WaveForm from './WaveForm'

const SongDetailsHeader = ({song,user, releaseDate}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }
    const calculateDaysOld = () => {
        const release = new Date(releaseDate);
        const now = new Date();
        const differenceInTime = now - release;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
        const yearsOld = Math.floor(differenceInDays / 365);
        if (yearsOld > 0) {
            return `${yearsOld} year${yearsOld > 1 ? 's' : ''} ago`;
        }

        const monthsOld = Math.floor(differenceInDays / 30);
        if (monthsOld > 0) {
            return `${monthsOld} month${monthsOld > 1 ? 's' : ''} ago`;
        }

        return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''} ago`;



    }
    let releaseTime = calculateDaysOld()
    console.log(releaseTime)

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
                <h1 className='song-title-details-2'>{user?.username}</h1>
                <WaveForm url= {song.song_url} isPlaying={isPlaying} togglePlay={togglePlay} />
            </section>
            {/* <WaveForm url= {song.song_url} /> */}
            <section>
             <h2 className='song-genre-detail'>#{song.genre}</h2>
             <h2 className='song-genre-detail'>{releaseTime}</h2>
            </section>
            <section className='song-image-container'>
                <img src={song.preview_img} alt={song.title} className='song-image' />
            </section>
            {/* <WaveForm url= {song.song_url} /> */}
            
        </main>
    )
}

export default SongDetailsHeader