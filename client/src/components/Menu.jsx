import axios from "axios"

// assets 
import menu1 from '../assets/menu1.png'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext"

const Menu = () => {
    const { addtoCart } = useContext(UserContext);

    const [data, setdata] = useState([]);

    const getFood = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/food/");
            setdata(response.data);
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getFood();
    }, []);

    console.log(data);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6">Menu</h1>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((item, index) => (
                    <div key={item._id || index} className="rounded-3xl shadow-lg bg-gray-100 p-6 flex flex-col items-center text-center">
                        {/* Rasm */}
                        <img
                            src={`http://localhost:5000/${item.image}`}
                            alt={item.title}
                            className="w-40 sm:w-48 h-40 sm:h-48 object-cover rounded-full shadow-md"
                        />
                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-semibold mt-4 truncate w-full">{item.title}</h2>

                        {/* Star rating (o‘zgaruvchan emas) */}
                        <div className="flex justify-center mt-2 text-orange-400 text-sm sm:text-base">
                            ⭐⭐⭐⭐⭐
                        </div>

                        {/* Tavsif */}
                        <p className="text-gray-600 mt-3 text-sm sm:text-base px-4 sm:px-6">
                            {item.descr || "No description available"}
                        </p>

                        {/* Narx & Tugma */}
                        <div className="flex items-center justify-between w-full px-4 sm:px-6 mt-4">
                            <p className="text-md sm:text-lg font-bold text-gray-800">${item.price || "N/A"}</p>
                            <button onClick={() => addtoCart(item._id)} className="bg-orange-500 text-white px-4 sm:px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
                                Order now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menu;
