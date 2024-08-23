
import Banner1 from "../assets/Banner2.jpg"
function Banner()
{
 return (
    <>
    <div className="w-full  sm:w-[98.7vw] mx-auto h-[30vh] relative">
        <img src={Banner1} className="w-full h-[25rem]"/>
    </div>
    <div className="absolute text-white mt-[-100px] text-center w-full">
        <h1 className="text-4xl  font-bold my-3 text-white">Crypto Tracker  </h1>
        <p className="text-2xl">Get All The Information About Crypto </p>
    </div>
    </>
 )
}
export default Banner;