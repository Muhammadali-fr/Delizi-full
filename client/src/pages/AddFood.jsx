import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Rasm va ikonka uchun assetlar
import upload from '../assets/upload.svg';
import menu1 from '../assets/menu1.png'
import { UserContext } from '../userContext';

const AddFood = () => {
  // State-lar (input maydonlari uchun)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // UI-da rasmni ko'rsatish uchun
  const [imageFile, setImageFile] = useState(null); // Serverga jo‘natish uchun
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Foydalanuvchi ma'lumotlarini localStorage-dan olish


  // Agar foydalanuvchi admin bo‘lmasa yoki tizimga kirmagan bo‘lsa, u kirishi kerak
  if (!user) {
    return <p>Please login first. If you aren't an admin, you can't add food.</p>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // UI uchun rasm
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Serverga yuborish uchun fayl
    }
  };

  // Form yuborilganda ishlaydigan funksiya
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Barcha maydonlar to‘ldirilganligiga ishonch hosil qilish
    if (!title || !description || !price || !imageFile) {
      alert("All fields are required, including the image.");
      return;
    }

    // Ma'lumotlarni yuborish uchun FormData yaratamiz
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descr", description);
    formData.append("price", Number(price)); // Narxni raqam sifatida yuborish
    formData.append("image", imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/food/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Food item uploaded successfully!");
        navigate("/");
      } else {
        alert(data.error || "Error uploading food item");
        console.log(data);
        
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the food item.");
    }
  };

  return (
    <div className="container flex gap-5 mx-auto">
      <form className="w-3/4 flex flex-col mx-auto py-8" onSubmit={handleSubmit}>
        <label className="w-40 gap-3 text-orange-500 font-bold cursor-pointer hover:bg-orange-300 flex items-center justify-center border border-orange-500 p-8 rounded-xl">
          <img src={upload} alt="upload" />
          Choose
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>

        <label className="text-orange-500 flex flex-col text-lg mb-4 mt-4">
          Title
          <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="text-black mt-2 p-3 border border-orange-500 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </label>

        <label className="text-orange-500 flex flex-col text-lg mb-4">
          Description
          <input onChange={e => setDescription(e.target.value)} value={description} type="text" className="mt-2 p-3 border border-orange-500 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </label>

        <label className="text-orange-500 flex flex-col text-lg mb-4">
          Price
          <input onChange={e => setPrice(e.target.value)} value={price} type="number" className="mt-2 p-3 border border-orange-500 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </label>

        <button type="submit" className="w-full sm:w-60 hover:bg-orange-600 bg-orange-500 text-white py-3 px-8 rounded-xl transition">
          Upload
        </button>
      </form>

      <div className="w-1/4 min-w-[16rem] rounded-3xl shadow-xl bg-gray-200 p-6 flex flex-col justify-between items-center text-center mx-auto">
        <img src={image ? (image) : (menu1)} alt="Spaghetti" className="w-56 sm:w-64 h-56 sm:h-64 object-cover rounded-full shadow-md" />
        <h2 className="text-lg sm:text-xl font-semibold mt-4">{title ? title : "Title"}</h2>
        <div className="flex justify-center mt-2 text-orange-400 text-sm sm:text-base">
          ⭐⭐⭐⭐⭐
        </div>
        <p className="text-gray-600 mt-3 text-sm sm:text-base px-4 sm:px-6">
          {description ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
        <div className="flex items-center justify-between w-full px-4 sm:px-6 mt-4">
          <p className="text-md sm:text-lg font-bold text-gray-800">${price ? price : "12.05"}</p>
          <button className="bg-orange-500 text-white px-4 sm:px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition">
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
