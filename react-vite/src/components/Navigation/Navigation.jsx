import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector} from "react-redux"
import "./Navigation.css";
import soudCloudImage from '../../../dist/soudcloud-icon.png'

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='div-navigation-wrapper'>
      <div className='div-navigation-a'>
        <NavLink to="/">
          <img className='homeImg'src={soudCloudImage} alt='Home img'></img>
        </NavLink>
          <h1>SoundCloud</h1>
      </div>

      <div className='div-navigation-a-user'>
        {sessionUser && <NavLink to="/songs/new" className={`upload-a-song`}>UPLOAD</NavLink>}
        <ProfileButton user={sessionUser} />
      </div>

    </div>
  );
}


export default Navigation;
