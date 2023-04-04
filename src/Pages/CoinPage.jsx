//import statements
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCoinMarketData, fetchCoins } from '../Redux/actions';

import { Chart } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment/moment.js";
import { useParams } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

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

const CoinPage = () => {

  const { id } = useParams(); //useParams() for getting the "Id" in the url

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState(); //structering and setting the chart data here
  const [range, setRange] = useState("30"); //range of the data
  const [chartTypeIsOpen, setChartTypeIsOpen] = useState(false);
  const [chartType, setChartType] = useState("line"); //state for holding the chart type
  const [currentCoin, setCurrentCoin] = useState(); // state for filtering the "coins" array and storing the matched data with the "id"
  const {
    coinMarketData,
    loading: marketLoading,
    error: marketError,
  } = useSelector((state) => state.marketData); //redux marketData state for fetching market Data of coin
  const { coins, loading, error } = useSelector((state) => state.coins); //needed for the image of the coin
  const { currency } = useSelector(state => state.currency);

  //chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 13,
          boxHeight: 13,
          useBorderRadius: true,
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

  //generates random color
  const datasetColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

  //fetching the 100 coins data to get the image of the "id" coin
  useEffect(() => {
    dispatch(fetchCoins());
    console.log(coins);

    //only when the data is fetched the currentCoin data is set
    if (coins) {
      setCurrentCoin(coins.find(coin => coin.id === id))
      return;
    }

  }, [id]) //runs everytime the id changes

  useEffect(() => {
    dispatch(fetchCoinMarketData(id, range, currency)); //dispatching the request to get market data if "id"

  }, [range, id]) //runs everytime the "range" and "id" changes

  useEffect(() => {

    //setting chart data
    setChartData(
      {
        labels: coinMarketData.map((price) => {
          return moment
            .unix(price[0] / 1000) //0th index of data for time stamp
            .format(range === "1" ? "HH:MM" : "DD-MM-YYYY");
        }),
        datasets: [
          {
            label: id,
            data: coinMarketData.map((price) => {
              return price[1]; //1th index of data for price stamp
            }),
            borderColor: datasetColor,
            backgroundColor: datasetColor,
          },
        ],
      }
    );

  }, [coinMarketData]) //runs everytime the "coinMarketData" is updated 





  //function for making chart Type drop down visible 
  const chartToggleDropdown = () => {
    setChartTypeIsOpen(!chartTypeIsOpen);
  };

  //setting "range" state to the updated range
  const handleRangeChange = (range) => {

    setRange(range);
  };

  //setting "cahrtType" state to the updated chart type
  const handleChartType = (option) => {
    setChartType(option);
    setChartTypeIsOpen(false);
  };

  return (
    <>
      <Header />

      <div className="col-span-full bg-white dark:bg-gray-900  rounded-lg flex flex-col">
        <div className="grid grid-cols-4 items-center bg-gray-100 dark:bg-gray-700 p-4">
          <div className="col-span-2 justify-center flex items-center">
            <button onClick={() => handleRangeChange("1")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6  text-sm">
              1D
            </button>
            <button onClick={() => handleRangeChange("7")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6 text-sm">
              1W
            </button>
            <button onClick={() => handleRangeChange("30")} className="bg-indigo-50 mx-1 dark:bg-slate-600 rounded-md px-4 h-6 text-sm">
              1M
            </button>
            <button onClick={() => handleRangeChange("180")} className="bg-indigo-50 mx-1 dark:bg-slate-600 rounded-md px-4 h-6  text-sm">
              6M
            </button>
            <button onClick={() => handleRangeChange("365")} className="bg-indigo-50 dark:bg-slate-600 mx-1 rounded-md px-4 h-6  text-sm">
              1Y
            </button>
          </div>

          {/* ChartType Dropdown */}

          <div >
            <div className="relative inline-block w-full text-left">
              <span className="rounded-lg flex justify-center w-full ">
                <button
                  type="button"
                  className="inline-flex h-9 bg-indigo-50 dark:bg-slate-600 w-2/3 shadow-sm items-center justify-between  rounded-lg  px-4 py-2  text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
                  <div className="origin-top absolute left-0 mx-auto right-0 text-center mt-2 w-2/3 rounded-md shadow-lg bg-white dark:bg-slate-400 ring-1 ring-black ring-opacity-5">
                    <ul
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <li
                        onClick={() => handleChartType("line")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Line
                      </li>
                      <li
                        onClick={() => handleChartType("bar")}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
        <div className="col-span-full bg-gray-100 py-4 px-2 dark:bg-gray-700 flex gap-4">
          <div className="col-span-full h-[30rem] w-[60rem] shadow bg-white dark:bg-gray-900 rounded-lg">
            {chartData && range && (
              <Chart type={chartType} data={chartData} options={chartOptions} />
            )}
          </div>
          <div className="col-span-full h-[30rem] w-[20rem] bg-white dark:bg-gray-900 rounded-lg">
            {currentCoin && (<div> <img className='px-8 py-4' src={currentCoin.image} alt={id} />
              <h1 className="flex text-xl font-bold px-4 py-4">{id}</h1>
              <div className="text-base px-4 py-2 ">Market Cap {currentCoin.market_cap}</div> </div>)}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default CoinPage