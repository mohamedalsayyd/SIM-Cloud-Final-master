import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CartContext } from "../context/CartContext";
import Qty from "./Qty";
const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  return (
    <div className="flex gap-x-8 ">
      <Link to={`product/${item._id}`} className="w-[70px] h-[70px]">
        <img
          src={`https://camerashop.com.eg/wp-content/uploads/2022/10/1-1653353121_1708099.jpg`}
          alt=""
        />
      </Link>
      <div className="flex-1">
        <div className="flex gap-x-4 mb-3">
          <Link className="" to={`product/${item._id}`}>
            {item.name}
          </Link>
          <div
            onClick={() => removeFromCart(item._id)}
            className="cursor-pointer text-[24px] hover:text-accent transition-all "
          >
            <IoClose />
          </div>
        </div>
        <div className="flex items-center gap-x-12">
          <div className="flex gap-x-4 mb-2">
            <Qty item={item} />
          </div>
          <div className="text-accent text-xl">
            $ {parseFloat(item.price * item.amount).toFixed(2)}
          </div>
        </div>
        <div>
          <span className="text-accent ">${item.price} per price</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
