//import statements 
import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../Redux/actions.js";
import {
  fetchCoinMarketData,
  fetchCoinMarketDataSuccess,
} from "../Redux/actions.js";

import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import moment from "moment/moment.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";

import { FaCalendarAlt } from "react-icons/fa";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";


const CoinChart = () => {

  const dispatch = useDispatch();

  const [cryptoIsOpen, setCryptoIsOpen] = useState(false);
  const [chartTypeIsOpen, setChartTypeIsOpen] = useState(false);
  const [ rangeSelectIsOpen, setRangeSelectIsOpen] =useState(false); 

  const [coinIds, setCoinIds] = useState([]); // state for holding the ids of selected coins
  const [coinData, setCoinData] = useState({}); // state for holding the data of the coin or coins that are selected
  const [chartType, setChartType]= useState ("line"); // state for type of chart 
  const [selectedRange, setSelectedRange] = useState("30");// state for selected range of the market data
  const [search, setSearch] = useState(""); // state for search statement in crypto Dropdown list
  const [ manualRangeData, setManualRangeData] = useState([]); // state for holding filtered data when a range of date is selected by user
  const [startDate, setStartDate] = useState(); // state for holding the beginning date of manually selected range
  const [endDate, setEndDate] = useState();  // state for holding the ending date of manually selected range

  const {currency} = useSelector(state => state.currency);
  const { coins, loading, error } = useSelector((state) => state.coins);
  const {
    coinMarketData,
    loading: marketLoading,
    error: marketError,
  } = useSelector((state) => state.marketData);

  //options for chart js 

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 13,
          boxHeight: 13,
          useBorderRadius:true,
          borderRadius: 7,
          textAlign: 'center',
        },
        
      },
      title: {
        display: false,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

 /*  // functions for getting value of the date 
 selected by user and setting it in startDate and endDate */
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
   
  };


  // variable for generating random colors for each dataset in chart
  const datasetColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  
 
  // useeffect for getting data for crypto dropdown menu
  useEffect(() => {
    dispatch(fetchCoins());
  }, []); /* // dependency array set to empty array to load the 
  data once when the component mounts */

  /* //setting coinIds to bitcoin when the coinIds is an empty array 
  including when the component mounts */
  useEffect(()=>{
    setCoinIds(["bitcoin"]);
  },[coinIds.length===0])

  /* this useEffect runs when any crypto / range / currency is selected. 
  Inside this it dispatches redux action "fetchCoinMarketDta" with coinIds, 
  selectedRange and currency parameter */
  useEffect(()=>{
    dispatch(fetchCoinMarketData(coinIds, selectedRange, currency));
  },[coinIds, selectedRange, currency])

  /* this useEffect gets called when the manual Range is selected by the user */
  useEffect(()=>{

    const startTimestamp = new Date(startDate).getTime() / 1000;
    const endTimestamp = new Date(endDate).getTime() / 1000;
    dispatch(fetchCoinMarketData(coinIds, selectedRange, "usd", startTimestamp, endTimestamp));

    //if startDate and EndDate is selected filters coinMarketData and stores it in manualRangeData
    if (startDate && endDate){
      const dataPoints = 30;
      const stride = Math.ceil(coinMarketData.length / dataPoints);
      const data = coinMarketData.filter((_, index) => index % stride === 0);
      setManualRangeData(data);
      return;
}
  //sets startData and endDate to 0 
  setStartDate(0);
  setEndDate(0);

  },[endDate]);


  //setting data for coinData state to render in in chart
  useEffect(() => {

    // setting coinData to empty dataset when  no coin is selected so can access the prevCoinData
    if (!coinIds || coinIds.length === 0) {
      setCoinData({ labels: [], datasets: [] });
      return;
    } 
        setCoinData((prevCoinData) => {
        
          // filters coinIds and finds the last crypto id that is added
          const newCoinId = coinIds[coinIds.length - 1]; 

          const existingIndex = prevCoinData.datasets.findIndex((d) => d.label === newCoinId);
  
          if (existingIndex !== -1) {
           
            const newDatasets = [...prevCoinData.datasets];
            newDatasets.splice(existingIndex, 1);
  
            // Pushing the new dataset with updated data
            newDatasets.push({
              label: newCoinId,
              /* when startDate and endDate is selected it maps 
              over manualRangeData which is the filtered data to limit the 
              number of datapoints, here using the 1th index which is the price for coin */
              data: startDate && endDate ? manualRangeData.map((price) => price[1]) : coinMarketData.map((price) => price[1]),
              borderColor:datasetColor,
              backgroundColor: datasetColor,
            });
  
            return {
              /* when startDate and endDate is selected it maps 
              over manualRangeData which is the filtered data to limit the 
              number of datapoints, here using the 0th index of the data which is timestamp */
              labels: startDate && endDate ? manualRangeData.map((price) => moment
              .unix(price[0] / 1000).format('DD-MM-YYYY')) : coinMarketData.map((price) =>
                moment 
                  .unix(price[0] / 1000)
                  .format(selectedRange === "1" ? "HH:MM" : "DD-MM-YYYY")
              ),
              datasets: newDatasets,
            };
          }

          const newDatasets = [...prevCoinData.datasets];
          newDatasets.push({
            label: newCoinId,
            data: startDate && endDate ? manualRangeData.map((price) => price[1]) : coinMarketData.map((price) => price[1]),
            borderColor: datasetColor,
            backgroundColor: datasetColor,
          });
  
          return {
            labels: startDate && endDate ? manualRangeData.map((price) => moment
            .unix(price[0] / 1000).format('DD-MM-YYYY')) : coinMarketData.map((price) =>
              moment
                .unix(price[0] / 1000)
                .format(selectedRange === "1" ? "HH:MM" : "DD-MM-YYYY")
            ),
            datasets: newDatasets,
          };
        });
     
  }, [ dispatch, coinMarketData, manualRangeData]); /* added coinMarketData in the dependency array 
  so this useEffect runs each time fresh data fetched */

//function for making crypto dropdown visible 
  const cryptoToggleDropdown = () => {
    setCryptoIsOpen(!cryptoIsOpen);
  };

//function for making chart Type drop down visible 
  const chartToggleDropdown = () => {
    setChartTypeIsOpen(!chartTypeIsOpen);
  };

  //function for making range inputs visible
  const toggleRangeSelect = () => {
    setRangeSelectIsOpen(!rangeSelectIsOpen);
  };

  //this function is for adding the selected cryptos in coinIds state which is an array
  const handleOptionSelect = (optionId) => {
    if (coinIds.includes(optionId)) {
      setCoinIds(coinIds.filter((id) => id !== optionId)); //checks if the crypto Id is already present
    } else {
      setCoinIds([...coinIds, optionId]); // if the id isnt present adds it to the array
    }
  };

 
  /* removing the dataset for the coins that is already selected, 
  checks if the label of the previous dataset matches with any that is 
  present in the coinIds array. If it does then it returns the previous coin Data 
  and if not then adds the new dataset. */
  useEffect(() => {
    setCoinData((prevCoinData) => {
      const newDatasets = prevCoinData.datasets.filter((dataset) => {
        const coinId = dataset.label;
        return coinIds.includes(coinId);
      });
      return { ...prevCoinData, datasets: newDatasets };
    });
  }, [coinIds, selectedRange]);

 /* this function takes the value of the buttons and
 adds it in selected range state */
  const handleRangeChange = (range) => {
    setSelectedRange(range);

    /* when the range buttons are clicked setting 
    the startDate and endDate to 0 to avoid data refetching */
    setStartDate(0);
    setEndDate(0);

    //also making the input fields for taking range from users invisible
    setRangeSelectIsOpen(false);
  };

  //this function take value of the drop down options and sets it to chart type state
  const handleChartType = (option) => {
    setChartType(option);
    setChartTypeIsOpen(false);
  };

  //checking if the redux state is loading then rendering "loading" is yes.
  if (loading) {
    return <div>Loading...</div>;
  }

  //rendering error is theres any error in redux state
  if (error) {
    return <div>Error: {error || marketError.message}</div>;
  }

/*coins variable holds the data for crypto drop down, 
mapping the array and structering the data for rendering it later */  
const options = coins.map((coin) => ({ id: coin.id, label: coin.id }));

//function for searching the crypto names in drop down menu
  const searchOptions = options.filter((option) =>
  option.label.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
    <div className="bg-white dark:bg-slate-900">
    <div className="grid grid-cols-4 items-center">
      <div className="col-span-2 justify-center flex items-center p-8">
        <button onClick={() => handleRangeChange("1")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6  text-sm">
          1D
        </button>
        <button onClick={() => handleRangeChange("7")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6 text-sm">
          1W
        </button>
        <button onClick={() => handleRangeChange("30")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6 text-sm">
          1M
        </button>
        <button onClick={() => handleRangeChange("180")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6  text-sm">
          6M
        </button>
        <button onClick={() => handleRangeChange("365")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6  text-sm">
          1Y
        </button>
        <div>
        <button onClick={toggleRangeSelect}
        className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6 text-sm">
          {" "}
          <FaCalendarAlt className="h-3" />
        </button>
       {rangeSelectIsOpen && (
        <div className="origin-top absolute overflow-hidden  rounded-md shadow-lg bg-white dark:bg-slate-600 ring-1 ring-black ring-opacity-5">
       <div className="flex flex-col space-y-2">
       <label className="font-bold">Start Date:</label>
       <input className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              type="datetime-local" 
              value={startDate} 
              max={new Date().toISOString().slice(0, 10)}
              onChange={handleStartDateChange} />
     
       <label className="font-bold">End Date:</label>
       <input className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              type="datetime-local" 
              value={endDate} 
              max={new Date().toISOString().slice(0, 10)}
              onChange={handleEndDateChange} />
     </div>
     </div>)} 
        </div>
       
       
      </div>
      {/* Cryptocurrency Dropdown */}
      <div>
        <div className="relative inline-block w-full text-left">
          <div>
            <span className="rounded-lg w-full shadow-sm">
              <button
                type="button"
                className="inline-flex items-center h-9 justify-between w-full rounded-lg px-4 py-2 bg-indigo-50 dark:bg-slate-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={cryptoToggleDropdown}
              >
                {coinIds.length ? coinIds.join(', ') : 'Cryptocurrency'}
                {cryptoIsOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
              </button>
            </span>
          </div>

          {cryptoIsOpen && (
            <div className="origin-top absolute overflow-hidden overflow-y-auto mt-2 h-40 w-full  rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5">
              <input
                className="px-2 pl-4 py-2 text-sm m-2 mx-auto block rounded-lg w-11/12 outline outline-1 outline-slate-400 hover:outline-indigo-500 hover:outline-offset-0"
                type="text"
                placeholder="Search coin"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {searchOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`${
                    coinIds.includes(option.id)
                      ? "bg-indigo-50 text-gray-900 dark:text-gray-800"
                      : "text-gray-700"
                  } block w-full text-left px-4 py-2 text-sm leading-5 hover:bg-gray-100 dark:hover:bg-gray-300 hover:text-gray-900 dark:hover:text-gray-800 dark:text-gray-300 focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                  role="menuitem"
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={coinIds.includes(option.id)}
                      onChange={() => handleOptionSelect(option.id)}
                    />
                    <span className="ml-2">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Cryptocurrency Dropdown */}

      {/* ChartType Dropdown */}

      <div onBlur={()=>{setChartTypeIsOpen(false)}}>
        <div className="relative inline-block w-full text-left">
          <span className="rounded-lg flex justify-center w-full ">
            <button
              type="button"
              className="inline-flex h-9 bg-indigo-50 dark:bg-slate-600 w-2/3 shadow-sm items-center justify-between  rounded-lg  px-4 py-2  text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={chartToggleDropdown}
            >
              Chart type
              {chartTypeIsOpen ? (
                <BsFillCaretUpFill />
              ) : (
                <BsFillCaretDownFill />
              )}
            </button>
          </span>

          {chartTypeIsOpen && (
            <div className="flex justify-self-center">
              <div className="origin-top dark:bg-slate-800 absolute left-0 mx-auto right-0 text-center mt-2 w-2/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <ul
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <li
                    onClick={() => handleChartType("line")}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Line
                  </li>
                  <li
                    onClick={() => handleChartType("bar")}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Bar
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ChartType Dropdown */}
    </div>
    <div>
    {
      coinIds.length > 0 &&
        coinData &&
        coinMarketData.length > 0 &&
        selectedRange && (
          <Chart key={coinIds.join(",")} type={chartType} data={coinData} options={chartOptions} />
        )}
    </div>
    </div>
    </>
  );
};

export default CoinChart;
