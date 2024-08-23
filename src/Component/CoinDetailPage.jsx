import { useParams } from "react-router-dom";
import fetchCoinDetails from "../Services/FetchCoinDetails";
import { useQuery } from "@tanstack/react-query";
import parse from 'html-react-parser';

function CoinDetailsPage() {
    const { coinId } = useParams();
    const { isError, isLoading, data: coin, error } = useQuery({
        queryKey: ["coin", coinId],
        queryFn: () => fetchCoinDetails(coinId),
        cacheTime: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 2,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        console.error(error); 
        return <div>Error: {error?.message || "Something went wrong"}</div>;
    }

    console.log('dataof', coin);

    return (
        <div className="flex flex-col w-full justify-center md:flex-row bg-black text-white overflow-x-hidden">
            <div className="w-full md:w-[80%] flex flex-col items-center mt-20 max-w-full px-4">
                <img 
                    alt={coin?.name}
                    src={coin?.image?.large}
                    className="h-52 mb-5"
                />
                <h1 className="text-4xl font-bold mb-5 text-center">{coin?.name}</h1>
                <p className="w-full sm:px-6 py-4 text-justify">
                    {coin?.description?.en ? parse(coin.description.en) : ""}
                </p>
                <div className="w-full flex flex-col md:flex-row md:justify-around items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="md:text-xl  font-bold">Rank</h2>
                        <span className="ml-3 text-yellow-300 text-xl">{coin?.market_cap_rank}</span>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="md:text-xl text-yellow-400 font-bold">Current Price</h2>
                        <span className="md:ml-3 md:text-xl">
                            {coin?.market_data?.current_price?.['usd'] ? `$${coin.market_data.current_price['usd']}` : "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <h2 className="md:text-xl text-yellow-400 font-semibold sm:font-bold">Market Cap </h2>
                        <span className="md:ml-3 md:text-xl">
                            {coin?.market_data?.market_cap_change_24h ? `$${coin.market_data.market_cap_change_24h}` : "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoinDetailsPage;
