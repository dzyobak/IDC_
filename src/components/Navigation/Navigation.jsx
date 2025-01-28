import { Link } from "react-router-dom";
import classes from "../Navigation/Navigation.module.css";
import Logo from "../../assets/81600.png";
// import MusicPlayer from "../MusicPlayer/MusicPlayer"

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <img className={classes.logo} src={Logo} alt="Logo" />
      <Link to="/IDC_/" className={classes.link}>
        81600
      </Link>

      <Link to="/store" className={classes.link}>
        Магазин
      </Link>
      {/* 
      <Link to="/social" className={classes.link}>
        Social
      </Link>

      <Link to="/vlogs" className={classes.link}>
        Vlogs
      </Link> */}
    </nav>
  );
};

export default Navigation;
