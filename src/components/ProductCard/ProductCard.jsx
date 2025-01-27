import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <div className={classes.product_card_wrapper}>
      <Link className={classes.product_card_link}>
        <img src="https://picsum.photos/300/300" alt="" />
        <h1 className={classes.title}>Candiar T-shirt (RARE)</h1>
        <span className={classes.price}>300$</span>
      </Link>
    </div>
  );
};

export default ProductCard;
