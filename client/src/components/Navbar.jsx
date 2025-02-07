import { NavLink, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";

// assets 
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import userImg from "../assets/user.jpeg";
import { UserContext } from '../userContext';

const Navbar = () => {
    const { user, cartLength } = useContext(UserContext)
    const [admin, setAdmin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user?.role == "admin") {
            setAdmin(true);
        }
    }, [user])

    return (
        <div className='container mx-auto flex items-center justify-between py-4 relative'>

            <Link to='/'>
                <img src={logo} alt="logo" />
            </Link>

            <ul className='flex items-center justify-between gap-3'>
                <li><NavLink to="/" className='hover:bg-orange-400 border text-orange-500 hover:text-white py-2 px-4 rounded-md'>Home</NavLink></li>
                <li><NavLink to="/some" className='hover:bg-orange-400 border text-orange-500 hover:text-white py-2 px-4 rounded-md'>Menu</NavLink></li>
                <li><NavLink to="/some" className='hover:bg-orange-400 border text-orange-500 hover:text-white py-2 px-4 rounded-md'>Order</NavLink></li>
                {admin &&
                    <li><NavLink to='/add' className='hover:bg-orange-400 border text-orange-500 hover:text-white py-2 px-4 rounded-md'>Add</NavLink></li>
                }
                <li><NavLink to="/some" className='hover:bg-orange-400 border text-orange-500 hover:text-white py-2 px-4 rounded-md'>Contact</NavLink></li>
            </ul>

            <div className="flex items-center justify-center gap-3">
                <Link to='/cart'>
                    <div className="relative flex items-center justify-center bg-gray-200 hover:bg-gray-300 py-2 px-3 cursor-pointer rounded-xl">
                        <img src={cart} alt="cart" className="w-8 h-8" />
                        <span className="absolute  top-0 left-6 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cartLength}
                        </span>
                    </div>
                </Link>

                {user ? (
                    <div className='relative'>
                        <div
                            className='bg-gray-200 hover:bg-gray-300 cursor-pointer py-2 px-3 rounded-2xl flex items-center justify-center'
                            onClick={() => setIsModalOpen(true)}
                        >
                            <img className='w-8 rounded-full' src={userImg} alt="userImg" />
                        </div>

                        {isModalOpen && (
                            <>
                                <div
                                    className="fixed inset-0"
                                    onClick={() => setIsModalOpen(false)}
                                ></div>

                                <div className="absolute top-14 right-0 bg-opacity-50 bg-gray-300  shadow-lg backdrop-blur-md rounded-lg p-4 w-64 z-50 flex items-start justify-center flex-col gap-3">
                                    <h3 className="text-lg font-semibold">Mening Profilim</h3>
                                    <p className="text-gray-700">{user?.name || "Ism yo‘q"}</p>
                                    <p className="text-gray-700">{user?.email || "Email yo‘q"}</p>
                                    <Link to="/logout">
                                        <button className='py-2 px-4 w-full bg-red-100 text-red-700 border rounded border-red-700 hover:bg-red-200'>Log out</button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <Link to="login">
                        <button className='text-white bg-green-700 py-2 px-5 rounded-lg cursor-pointer hover:bg-green-600'>Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
