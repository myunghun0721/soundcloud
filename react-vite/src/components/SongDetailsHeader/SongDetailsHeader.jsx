import './SongDetailsHeader.css'

const SongDetailsHeader = ({song}) => {
    return (
        <main className='song-details-header'>
            <section className='song-image-container'>
                <img src={song.preview_img} alt={song.title} className='song-image' />
            </section>
            <section className='song-info-container'>
                <h1 className='song-title'>{song.title}</h1>
            </section>
        </main>
    )
}

export default SongDetailsHeader