// assets 
import home1 from '../assets/home1.png'
import Menu from '../components/Menu'

const Home = () => {
    return (
        <div>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12 px-6">
                {/* Chap tomondagi matn qismi */}
                <div className="max-w-lg text-center md:text-left">
                    <button className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                        Restaurant
                    </button>
                    <h1 className="text-7xl font-bold text-amber-900 leading-tight">
                        Italian <br /> Cuisine
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales senectus dictum arcu sit tristique donec eget.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
                            Order now
                        </button>
                        <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
                            Reservation
                        </button>
                    </div>
                </div>

                {/* O'ng tomondagi rasm qismi */}
                <div className="mt-8 md:mt-0 flex justify-center">
                    <img src={home1} alt="Italian Cuisine" className="w-full max-w-lg md:max-w-2xl rounded-lg" />
                </div>
            </div>

        <Menu/>


        </div>
    )
}

export default Home