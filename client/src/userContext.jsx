import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      axios.get("/api/auth/profile", { withCredentials: true }).then(({ data }) => {
        console.log("User data from backend:", data);
        setUser(data);
      }).catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = user?._id;
      if (!userId) return alert("user id kerak cartlarni olish uchun!")
      const { data } = await axios.get(`/api/cart/${userId}`)
      setCart(data.cart)
    }
    if (user) fetchCart();
  }, [user])

  const addtoCart = async (foodId) => {
    const userId = user._id;
    if (!userId) return alert("cart ga malumot qoshish uchun user royhatdan otishingiz kerak id kerak");

    const { data } = await axios.post("/api/add-cart", { userId, foodId })
    setCart(data.cart);
  }

  const substractCart = async (foodId) => {
    const userId = user?._id;
    if (!userId) return alert("ovqatni ochirish uchun user id kerak.")
    try {
      await axios.post("/api/subtract-cart", { foodId, userId })

    } catch (error) {
      alert("removing err")
    }
  }

  const cartLength = cart.length;
  console.log(cartLength);


  return (
    <UserContext.Provider value={{ user, setUser, addtoCart, cart, cartLength, substractCart }}>
      {children}
    </UserContext.Provider>
  );
}
