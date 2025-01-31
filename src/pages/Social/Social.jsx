import classes from "../Social/Social.module.css";

const Social = () => {
  return (
    <div className={classes.wrapper}>
      <hr className={classes.hr} />
      <div className={classes.link_wrapper}>
        <a
          href="https://www.instagram.com/dzyobak/"
          target="_blank"
          className={classes.link}
        >
          INSTAGRAM
        </a>
        <br />
        <a
          href="https://www.instagram.com/opipsyyonki/"
          target="_blank"
          className={classes.link}
        >
          INSTAGRAM2
        </a>
        <br />
        <a
          href="https://www.instagram.com/ihordzobak/"
          target="_blank"
          className={classes.link}
        >
          INSTAGRAM3
        </a>
        <br />
        <a
          href="https://www.instagram.com/trauenj"
          target="_blank"
          className={classes.link}
        >
          INSTAGRAM4
        </a>
      </div>
      <hr className={classes.hr} />
    </div>
  );
};

export default Social;
