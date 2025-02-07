import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";

// assets  
import LoginBackImg from '../assets/loginBack.png';
import { UserContext } from '../userContext';


const Signup = () => {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/auth/register", {
                name,
                email,
                password
            }, {
                withCredentials: true
            });

            alert("well done you signed up, now you can login.")
            navigate("/login")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='w-full flex items-center justify-between '>
            <div className='w-[50%]'>
                <form onSubmit={handleSubmit} className='w-[60%] mx-auto gap-5 flex item-start justify-start flex-col' action="#">
                    <h1 className='text-6xl font-bold'>Sign up</h1>
                    <p>Already have an account?<Link className='text-blue-700 font-bold' to='/login'> Login</Link></p>
                    <input required value={name} onChange={e => setName(e.target.value)} placeholder='Full name' className='py-4 border-orange-500 border outline-orange-500 rounded text-orange-500 px-5' type="text" />
                    <input required value={email} onChange={e => setEmail(e.target.value)} placeholder='Email address' className='py-4 border-orange-500 border outline-orange-500 rounded text-orange-500 px-5' type="email" />
                    <input required value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='py-4 border-orange-500 border outline-orange-500 rounded text-orange-500 px-5' type="password" />
                    <div className='w-[90%] mx-auto flex items-center justify-between'>
                        <label className='flex gap-3 items-center justify-start'>
                            <input type="checkbox" />
                            Remember me
                        </label>
                    </div>
                    <div className='w-[90%] mx-auto'>
                        <Link to='/'> Click here to back home page</Link>
                    </div>
                    <button className='w-full bg-orange-500 hover:bg-orange-400 py-4 text-white font-extrabold rounded'>Sign up </button>
                </form>
            </div>
            <div className='w-[50%]'>
                <img className='w-full h-screen' src={LoginBackImg} alt="login background img" />
            </div>
        </div>
    )
}

export default Signup