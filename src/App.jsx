import { useState, useEffect} from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key=" 
        + API_KEY
      );
      const json = await response.json();
      console.log(json)
      setList(json);
    };
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (!list || !list.Data) return;
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      console.log("Filtered Data:...");
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      console.log("Empty search value...")
      console.log(Object.keys(list.Data));
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className='whole-page'>
        <h1>My Crypto list</h1>
        <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
            {searchInput.length > 0
            ? filteredResults.map((coin) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                />
                : null
                )
            : list && Object.entries(list.Data).map(([coin]) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                    image={list.Data[coin].ImageUrl}
                    name={list.Data[coin].FullName}
                    symbol={list.Data[coin].Symbol}
                />
            : null
            )}
        </ul>
    </div>
  )
}

export default App
