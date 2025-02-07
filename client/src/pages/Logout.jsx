import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { UserContext } from '../userContext';

const Logout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout")
            setUser(null)
            navigate('/login');
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            {/* Like Button */}
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                👍 Like
            </button>

            {/* Logout Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
                🚪 Logout
            </button>

            {/* Modal (Are you sure?) */}
            {isModalOpen && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    {/* Modal Box */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
                        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Logout;
