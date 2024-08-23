import axiosInstance from "../Helper/Axiosinstance";

export default async function FetchData(page, currency) {
  console.log("Fetching data:", page, currency); 
  try {
    const response = await axiosInstance.get(`coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}`);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error; 
  }
}
