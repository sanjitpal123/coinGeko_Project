import aioxInstance from "../Helper/Axiosinstance";

export async function  FetchCoinHistory(coinId, Days,currency)
{
    console.log("currencyinfet",currency)
    console.log("coin",coinId)
    try{
        const response= await aioxInstance.get(`/coins/${coinId}/market_chart?vs_currency=${currency}&days=${Days}`);
        return response.data.prices;
    } catch(error)
    {
        throw error;
    }
}
