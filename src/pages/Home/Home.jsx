import Nature from "../../assets/TOILET.png";
import classes from "../Home/Home.module.css";

const Home = () => {
  return (
    <div className={classes.home_wrapper}>
      {/* <h1 className={classes.title}>IhorDzobakCandiar</h1>
      <sub className={classes.sub_title}>IDC_</sub> */}
      <img src={Nature} alt="Nature" className={classes.photo} />
    </div>
  );
};

export default Home;
