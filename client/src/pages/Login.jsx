import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginBackImg from '../assets/loginBack.png';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/auth/login", {
                email,
                password
            }, {
                withCredentials: true
            });

            alert("Logged in");
        } catch (error) {
            alert(error || "An error occurred");
        }
    };

    return (
        <div className='w-full flex items-center justify-between'>
            <div className='w-[50%]'>
                <form onSubmit={handleSubmit} className='w-[60%] mx-auto gap-5 flex item-start justify-start flex-col'>

                    <h1 className='text-6xl font-bold'>Login</h1>
                    <p>Don't have an account?<Link className='text-blue-700 font-bold' to='/sign-up'> Sign up</Link></p>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email address' className='py-4 border-orange-500 border outline-orange-500 rounded text-orange-500 px-5' type="email" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' className='py-4 border-orange-500 border outline-orange-500 rounded text-orange-500 px-5' type="password" />
                    <div className='w-[90%] mx-auto flex items-center justify-between'>
                        <label className='flex gap-3 items-center justify-start'>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <Link>Forget Password?</Link>
                    </div>
                    <div className='w-[90%] mx-auto'>
                        <Link to='/'> Click here to back home page</Link>
                    </div>
                    <button className='w-full bg-orange-500 hover:bg-orange-400 py-4 text-white font-extrabold rounded'>Log in</button>
                </form>
            </div>

            <div className='w-[50%]'>
                <img className='w-full h-screen' src={LoginBackImg} alt="login background img" />
            </div>


        </div>
    );
};

export default Login;
