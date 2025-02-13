import React, { useContext } from "react";
import Menu from "../components/Menu";

// assets 
import Delete from "../assets/delete.svg";
import Minus from "../assets/minus.svg";
import Plus from "../assets/plus.svg";
import { UserContext } from "../userContext";

const Cart = () => {
  const { cart, addtoCart, substractCart } = useContext(UserContext);

  const totalCost = cart.reduce((prev, curr) => {
    return prev + (curr.foodId?.price || 0) * curr.quantity;
  }, 0)

  return (
    <div className="container mx-auto flex items-start justify-between gap-5">
      <Menu />
      <div className="w-56">
        <div className="flex items-center justify-center bg-purple-700 text-white py-3 px-3 rounded-xl text-2xl">
          <p>Order List</p>
        </div>

        {cart.length === 0 ? (
          <p className="text-center mt-5">Savatcha bo‘sh</p>
        ) : (
          <div className="my-5">
            {cart.map((item) => (
              <div key={item._id} className="border-b border-gray-300 pb-3 mb-3">
                <div className="w-full flex items-center justify-between">
                  <p className="text-xl font-bold">{item.foodId.title}</p>
                  <img className="cursor-pointer" src={Delete} alt="delete" />
                </div>
                <div className="w-full flex items-center justify-between my-3">
                  <div className="flex items-center justify-between gap-3">
                    <img className="cursor-pointer" src={Minus} onClick={() => substractCart(item.foodId._id)} alt="minus" />
                    <p className="font-bold">{item.quantity}</p>
                    <img className="cursor-pointer" onClick={() => addtoCart(item.foodId._id)} src={Plus} alt="plus" />
                  </div>
                  <p className="text-xl text-orange-500 font-extrabold">
                    <span>{((item.foodId?.price || 0) * item.quantity).toFixed(2)}</span>$
                  </p>
                </div>
              </div>
            ))}
            <p>total cost <span>{totalCost.toFixed(2)} $</span></p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
