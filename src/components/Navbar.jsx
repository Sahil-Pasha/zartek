import React from "react";
import Arrow from "../constants/Arrow.png";
import Cart from "../constants/cart.png";
import { useSelector } from "react-redux";
const Navbar = (props) => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="sticky top-0 bg-white">
      <div className="flex flex-row space-x-10 sm:space-x-80">
        <p className="ml-2 mt-1 lg:hidden">
          <img width={20} height={20} src={Arrow} alt="Arrow" />
        </p>

        <p>{props.resName}</p>
        <p className="lg:ml-24">My Orders</p>
        <p className="flex flex-row text-right">
          <img width={20} height={20} src={Cart} alt="Cart" />{" "}
          <p>{cartItems.length}</p>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
