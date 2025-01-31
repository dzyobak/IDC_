import Nature from "../../assets/photo.jpg";
import classes from "../Home/Home.module.css";

const Home = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.home_wrapper}>
        <h1 className={classes.title}>IhorDzobakCandiar</h1>
        <img src={Nature} alt="Nature" className={classes.photo} />
      </div>
    </div>
  );
};

export default Home;
