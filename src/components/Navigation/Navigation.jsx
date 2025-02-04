import { Link } from "react-router-dom";
import classes from "../Navigation/Navigation.module.css";
import Logo from "../../assets/logo3_BW.jpeg";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <Link to="/">
        <img className={classes.logo} src={Logo} alt="Logo" />
      </Link>

      <Link to="/" className={classes.link}>
        IDC_
      </Link>

      <Link to="/store" className={classes.link}>
        STORE
      </Link>

      <Link to="/social" className={classes.link}>
        SOCIAL
      </Link>

      <Link to="/vlogs" className={classes.link}>
        VLOGGGS
      </Link>
    </nav>
  );
};

export default Navigation;
