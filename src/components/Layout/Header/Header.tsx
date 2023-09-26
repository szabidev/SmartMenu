import { FC } from "react";
import CartAction from "../../Cart/CartAction/CartAction";
import "./Header.css";
import mealsImage from "../../../assets/meals.jpg";

const Header: FC<{ onShowCart: () => void }> = ({ onShowCart }) => {
  return (
    <>
      <header className="header__container">
        <h1 className="header-logo">SmartMeals</h1>
        <CartAction onShowCart={onShowCart} />
      </header>
      <div className={"main-image"}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
