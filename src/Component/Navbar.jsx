import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyStore } from "../Contextstore/Store";

function Navbar() {
  const navigate = useNavigate();
  const { setCurrency, Setsearchvalue, Searchvalue, CoinList } = useContext(MyStore);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleInput(e) {
    Setsearchvalue(e.target.value);
    setShowDropdown(true); 
  }

  function handleItemClick(id) {
    Setsearchvalue(id);
    console.log('coin name',id)
    navigate(`/details/${id}`);
    setShowDropdown(false); 

  }

  function goBackToHome() {
    navigate("/");
  }

  const filteredCoinList = CoinList.filter((coin) =>
    coin.name.toLowerCase().includes(Searchvalue.toLowerCase())
  );
  console.log('filter', filteredCoinList);

  return (
    <>
      <div className="navbar text-yellow-300  fixed z-[100] bg-transparent backdrop-blur-md border-b-2 mb-10 bg-black" >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] text-black mt-3 w-52 p-2 shadow"
            >
              <li onClick={() => setCurrency("usd")}>
                <a>USD</a>
              </li>
              <li onClick={() => setCurrency("inr")}>
                <a>INR</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-[12px] sm:text-xl" onClick={goBackToHome}>
            CryptoTracker
          </a>
        </div>
        <div className="navbar-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Coin ..."
              className="text-black mx-2 w-[100px] sm:w-[300px]"
              onChange={handleInput}
              onClick={() => setShowDropdown(true)} 
            />
            {showDropdown && (
              <div className="absolute  bg-white text-black border border-gray-200 w-full mt-1 rounded-lg shadow-lg max-h-60 mr-10px overflow-y-auto">
                {filteredCoinList.length > 0 ? (
                  filteredCoinList.map((coin) => (
                    <div
                      key={coin.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleItemClick(coin.id)}
                    >
                      {coin.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2">No results found</div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Navbar;
