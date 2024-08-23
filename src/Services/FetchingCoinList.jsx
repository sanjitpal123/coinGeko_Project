// No syntax errors or issues
import axiosInstance from "../Helper/Axiosinstance";

export default async function FetchingCoinList() {
  try {
    const response = await axiosInstance.get('/coins/list');
    console.log('Fetched coin list data:', response.data); // Debugging
    return response.data; 
  } catch (error) {
    console.error('Error fetching coin list:', error);
    throw error; 
  }
}
