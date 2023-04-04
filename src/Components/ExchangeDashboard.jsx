
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { fetchExchangeRates } from "../Redux/actions";
import { fetchCoins } from "../Redux/actions";


const ExchangeDashboard = () => {
    const dispatch = useDispatch();

   const {exchangeRate, supportedVsCurr, error, loading} = useSelector((state)=> state.exchange);
   const { coins } = useSelector((state) => state.coins);

    const [sellingCurrency, setSellingCurrency] = useState("");
    const [buyingCurrency, setBuyingCurrency] = useState("");
    const [enterValue, setEnterValue] = useState(0);
    const [exchangeValue, setExchangeValue] = useState('');
    const [exchangeMessage, setExchangeMessage] = useState("");

    useEffect(() => {
      dispatch(fetchCoins());
    }, []);

    const handleSellingCurrencyChange = (event) => {
        setSellingCurrency(event.target.value);
    };

    const handleBuyingCurrencyChange = (event) => {
      console.log(event.target.value);
        setBuyingCurrency(event.target.value);
    };

    const handleEnterValueChange = (event) => {
        setEnterValue(event.target.value);
        
    };
 

    const handleCalculateClick = () => {
    
        dispatch(fetchExchangeRates(sellingCurrency, buyingCurrency));
    };


    const handleExchangeClick = () => {
      if (exchangeValue !== undefined) {
        const message = `${enterValue} ${sellingCurrency} exchanged to ${exchangeValue} ${buyingCurrency}`;
        setExchangeMessage(message);
      }
    };
    

    const rate = useMemo(() => {
        return exchangeRate[sellingCurrency] ? exchangeRate[sellingCurrency][buyingCurrency] : undefined;
    }, [sellingCurrency, exchangeRate]);



    useEffect(() => {
        setExchangeValue(rate !== undefined ? enterValue * rate : null);
    }, [enterValue, rate]);

    const selectOptions = coins.map((coin)=> ({ id: coin.symbol, label: coin.id }))
    
    return (
      <>
      <div className="bg-white-200 dark:bg-slate-900 rounded-lg">
        <h2 className="text-xl px-6 py-2 font-medium mr-2">Exchange Coins</h2>
        <br />
        <div className="flex flex-row px-[2rem]">
  <div className="px-4">
    <label htmlFor="sellingCurrency" className="block font-medium mr-2 text-red-500">
      Sell
    </label>

    <select
      className="bg-slate-300 rounded block w-[10rem] px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
      role="menuitem"
      id="sellingCurrency"
      value={sellingCurrency}
      onChange={handleSellingCurrencyChange}
    >
      {selectOptions.map((option) => (
        <option key={option.id} value={option.label}>{option.label}</option>
      ))}
      <option value="usd">USD</option>
      <option value="inr">INR</option>
    </select>
  </div>

  <div className="px-4" >
    <label htmlFor="buyingCurrency" className="block font-medium mr-2 text-green-500">
      Buy
    </label>
    <select
      className="bg-slate-300 rounded block w-[10rem] px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-gray-900"
      role="menuitem"
      id="buyingCurrency"
      value={buyingCurrency}
      onChange={handleBuyingCurrencyChange}
    >
      {selectOptions
        .filter((option) => supportedVsCurr.includes(option.id))
        .map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
          
        ))}
        <option value="usd">USD</option>
        <option value="inr">INR</option>
    </select>
  </div>
</div>

    
        <div className="flex items-center py-4 mb-4">
          <label htmlFor="exchangeAmount" className="block font-medium px-4 mr-2">
            Enter Value:
          </label>
          <input
            className="placeholder-italic placeholder-slate-400 block bg-white border border-slate-300 w-40 rounded-md shadow-sm h-8"
            placeholder="Enter exchange amount"
            id="enterValue"
            type="number"
            value={enterValue}
            onChange={handleEnterValueChange}
          />
          <button className="bg-blue-700 rounded border-black-300 px-4 py-2 text-white text-sm font-medium text-gray-700 ml-2"
            onClick={handleCalculateClick}>
            {loading ? "Loading..." : "Calculate"}
          </button>
          {error && (
            <div className="mb-4 text-red-500 ml-2">
              Error occurred while fetching exchange rate!
            </div>
          )}
        </div>
    
      
 
    <div className="flex items-center px-4 mb-4">
      <label htmlFor="exchangeValue" className="block font-serif mr-2 block font-medium px-2 mr-2">
        Exchange Value:
      </label>
      <input
        type="text"
        value={exchangeValue}
        readOnly
        className="bg-white border border-slate-300 w-40 rounded-md shadow-sm h-8 px-2"
      />
      <button
        onClick={handleExchangeClick}
        className="bg-blue-700 rounded border-black-300 px-4 py-2 text-white text-sm font-medium ml-2"
      >
        Exchange
      </button>
    </div>
    <div className="bg-white-200 dark:bg-slate-900  text-fuchsia-500 font-medium px-8 mt-4">{exchangeMessage}</div>
  </div>
</>
     
    );
};

export default ExchangeDashboard;