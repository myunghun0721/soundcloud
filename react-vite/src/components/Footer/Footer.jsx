import "./Footer.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Footer() {
  return (
    <div className="footer">
      <AudioPlayer
        src="https://media.bgmstore.net/mp3/zcvFY.mp3"
        onPlay={(e) => console.log(e)}
      />
    </div>
  );
}

export default Footer;
