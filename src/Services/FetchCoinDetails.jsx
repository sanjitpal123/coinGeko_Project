
import aioxInstance from "../Helper/Axiosinstance";
export async function fetchCoinDetails(id) {
    try {
        const response = await aioxInstance.get(`/coins/${id}`);
        return response.data;

    } catch(error) {
        console.error(error);
        return null;
    }
}
export default fetchCoinDetails;