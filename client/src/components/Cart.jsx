import React, { useContext } from "react";
import { IoArrowForward, IoCartOutline, IoClose } from "react-icons/io5";
import { CartContext } from "./../context/CartContext";
import CartItem from "../components/CartItem";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast.success("Successfully!");
const clear = () =>
  toast("Your cart is empty", {
    icon: "🛒",
  });

const Cart = () => {
  const { setIsOpen, cart, total, clearCart } = useContext(CartContext);
  return (
    <div className="w-full h-full px-4 text-white">
      <div className="overflow-y-auto overflow-x-hidden h-[75vh]">
        <div
          onClick={() => setIsOpen(false)}
          className="text-4xl w-20 h-[98px] flex mt-5 justify-start cursor-pointer"
        >
          <IoClose />
        </div>
        <div className="flex flex-col gap-y-10 px-2">
          {cart.map((item, index) => {
            return <CartItem item={item} key={index} />;
          })}
        </div>
      </div>
      {cart.length >= 1 && (
        <div className="px-6 py-10 flex flex-col ">
          <div className="flex justify-between text-lg">
            <div>Subtotal</div>
            <div>$ {parseFloat(total).toFixed(2)}</div>
          </div>
          <div className="flex justify-between text-2xl">
            <div>Total</div>
            <div>${parseFloat(total).toFixed(2)}</div>
          </div>
        </div>
      )}

      {/* buttons */}
      <div className="px-6">
        {cart.length >= 1 ? (
          <div className="flex justify-between gap-x-4">
            <button
              onClick={() => {
                clearCart();
                clear();
              }}
              className="btn btn-accent hover:bg-accent-hover text-primary"
            >
              clear cart
            </button>
            <button
              onClick={async () => {
                notify();
                clearCart();
                const res = await fetch("/u/orders/add")
                console.log(await res.json());
              }}
              className="btn btn-accent hover:bg-accent-hover text-primary"
            >
              Checkout
              <IoArrowForward className="text-lg" />
            </button>
          </div>
        ) : (
          <div className="h-full absolute top-0 right-0 left-0 flex justify-center items-center -z-10 flex-col text-white/30">
            <div className="text-2xl">Your cart is empty</div>
            <div className="text-6xl">
              <IoCartOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
