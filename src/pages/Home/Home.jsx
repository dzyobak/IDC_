import Nature from "../../assets/photo.jpg";
import classes from "../Home/Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.home_wrapper}>
        <Link
          className={classes.title}
          to="https://www.deepseek.com/"
          target="_blank"
        >
          IHORDZOBAKCANDIAR
        </Link>
        <img src={Nature} alt="Nature" className={classes.photo} />
      </div>
    </div>
  );
};

export default Home;
