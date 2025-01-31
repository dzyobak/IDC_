import classes from "../Vlogs/Vlogs.module.css";
import { Link } from "react-router-dom";

const Vlogs = () => {
  return (
    <div className={classes.wrapper}>
      <hr className={classes.hr} />
      <div className={classes.link_wrapper}>
        <Link className={classes.link}>VLOGS HERE</Link>
      </div>
      <hr className={classes.hr} />
    </div>
  );
};

export default Vlogs;
