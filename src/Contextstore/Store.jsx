import { createContext, useEffect, useState } from "react";
import FetchingCoinList from "../Services/FetchingCoinList"; // Correct path

export const MyStore = createContext();

function Provider({ children }) {
  const [currency, setCurrency] = useState('usd');
  const [Searchvalue, Setsearchvalue] = useState('');
  const [CoinList, SetCoinList] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchingCoinList();
        console.log('Fetched coin list:', data); 
        SetCoinList(data); 
      } catch (error) {
        console.error('Failed to fetch coin list:', error);
      }
    }
    fetchData();
  }, []); 




  const value = {
    currency,
    setCurrency,
    Setsearchvalue,
    Searchvalue,
    SetCoinList,
    CoinList,
 
  };

  return <MyStore.Provider value={value}>{children}</MyStore.Provider>;
}

export default Provider;
