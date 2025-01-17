import { Link } from "react-router-dom";
import classes from "../Navigation/Navigation.module.css";
import Logo from "../../assets/logo3.jpg"

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <img className={classes.logo} src={Logo} alt="Logo" />
      <div className={classes.nav_wrapper}>
        <Link to="/" className={classes.link}>IDC_</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link to="/store" className={classes.link}>Store</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link to="/social" className={classes.link}>Social</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link to="/vlogs" className={classes.link}>Vlogs</Link>
      </div>
    </nav>
  );
};

export default Navigation;
