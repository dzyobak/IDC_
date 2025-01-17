import Nature from "../../assets/photo.jpg"
import classes from "../Home/Home.module.css"

const Home = () => {
  return <div className={classes.homne_wrapper}>
    <h1 className={classes.title}>IhorDzobakCandiar</h1>
    <img src={Nature} alt="Nature" className={classes.photo}/>
  </div>

};

export default Home;
