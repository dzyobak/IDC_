import classes from "../Vlogs/Vlogs.module.css";

const Vlogs = () => {
  return (
    <div className={classes.vlogs_wrapper}>
      <hr className={classes.hr} />
      <div className={classes.vlogs_link_wrapper}>
        <a
          href="https://www.youtube.com/@ihorihorihorihorihorihor"
          target="_blank"
          className={classes.vlog_link}
        >
          VLOGS!
        </a>
      </div>
      <hr className={classes.hr} />
    </div>
  );
};

export default Vlogs;
