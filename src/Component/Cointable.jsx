import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FetchData from "../Services/FetchCoingekoapi";
import Navbar from "./Navbar";
import ResponsiveLoaders from "./Spinner";
import { MyStore } from "../Contextstore/Store";

function Cointable() {
  const [page, setPage] = useState(1);  
  const { currency } = useContext(MyStore); 
  const navigate = useNavigate();  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["coin", page, currency],
    queryFn: () => FetchData(page, currency),
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });



  if (isLoading) {
    return (
      <div className="w-full bg-black min-h-[50vh]">
        <ResponsiveLoaders /> 
      </div>
    );
  }

  if (isError) {
    throw new Error(error);
  }
  
  function handleCoinClick(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="w-full bg-black flex justify-center">
      <div className="my-5 flex flex-col bg-black items-center cursor-pointer justify-center gap-5 sm:w-[80vw] w-full">
        <div className="w-full bg-yellow-300 mt-[200px] text-black py-4 px-2 font-semibold flex items-center justify-center">
          <div className="basis-[50%] sm:basis-[30%] text-3xl sm:text-1xl flex items-center mx-3 justify-start">
            Coins
          </div>
          <div className="basis-[50%] sm:basis-[30%] text-3xl sm:text-1xl flex justify-center items-center sm:justify-start">
            Price
          </div>
          <div className="hidden sm:block basis-[20%] text-3xl">24h Change</div>
          <div className="hidden sm:block basis-[20%] text-3xl">Market Cap</div>
        </div>
        <div className="flex flex-col w-full">
          {data?.map((coin) => (
            <div
              key={coin.id}
              className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between"
              onClick={() => handleCoinClick(coin.id)}
            >
              <div className="flex items-center px-4 gap-2 basis-[30%]">
                <img
                  src={coin.image}
                  className="w-[3rem] h-[3rem]"
                  alt={coin.name}
                />
                <span className="text-yellow-300">{coin.name}</span>
              </div>
              <div
                className={`basis-[30%] ${
                  coin.current_price > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {currency === "usd"
                  ? `$${coin.current_price.toFixed(2)}`
                  : coin.current_price.toFixed(2)}
              </div>
              <div
                className={`basis-[20%] hidden sm:block ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div
                className={`basis-[20%] hidden sm:block ${
                  coin.market_cap > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {currency === 'usd'
                  ? `$${coin.market_cap.toLocaleString()}`
                  : `${coin.market_cap.toLocaleString()}`}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-yellow-400 text-black rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-yellow-400 text-black rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cointable;
