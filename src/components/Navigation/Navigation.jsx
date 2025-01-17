import { Link } from "react-router-dom";
import classes from "../Navigation/Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.nav_wrapper}>
        <Link className={classes.link}>IDC_</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link className={classes.link}>Store</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link className={classes.link}>Social</Link>
      </div>
      <div className={classes.nav_wrapper}>
        <Link className={classes.link}>Vlogs</Link>
      </div>
    </nav>
  );
};

export default Navigation;
