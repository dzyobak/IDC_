import { Link } from "react-router-dom";
import classes from "../Navigation/Navigation.module.css";
import Logo from "../../assets/logo3_BW.jpeg";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <img className={classes.logo} src={Logo} alt="Logo" />

      <Link to="/" className={classes.link}>
        IDC_
      </Link>

      <Link to="/store" className={classes.link}>
        Store
      </Link>

      <Link to="/social" className={classes.link}>
        Social
      </Link>

      <Link to="/vlogs" className={classes.link}>
        Vlogs
      </Link>
    </nav>
  );
};

export default Navigation;
