import axios from 'axios';
import { FETCH_EXCHANGE_RATES_FAILURE, FETCH_EXCHANGE_RATES_REQUEST, FETCH_EXCHANGE_RATES_SUCCESS, UPDATE_CURRENCY } from './constants';
import { SEARCH_CRYPTO_BEGIN, SEARCH_CRYPTO_SUCCESS, SEARCH_CRYPTO_FALIURE} from './constants';
import { FETCH_SIDEBAR_DATA_BEGIN,FETCH_SIDEBAR_DATA_SUCCESS, FETCH_SIDEBAR_DATA_FAILURE } from './constants';
import { FETCH_COINS_BEGIN, FETCH_COINS_FAILURE, FETCH_COINS_SUCCESS } from './constants';
import { FETCH_COIN_MARKET_DATA_START,FETCH_COIN_MARKET_DATA_SUCCESS, FETCH_COIN_MARKET_DATA_FAILURE  } from './constants';

export const updateCurrency = (currency) => ({
  type: UPDATE_CURRENCY,
  currency,
});

//CRYPTO SEARCH 

export const searchCryptoBegin = () => ({
  type: SEARCH_CRYPTO_BEGIN
});

export const searchCryptoSuccess = cryptoInfo => ({
  type: SEARCH_CRYPTO_SUCCESS,
  payload: { cryptoInfo }
});

export const searchCryptoFailure = error => ({
  type: SEARCH_CRYPTO_FALIURE,
  payload: { error }
});

export const cryptoSearch = () => {
  return dispatch => {
    dispatch(searchCryptoBegin());
    return axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        const cryptoInfo = response.data;
        
        dispatch(searchCryptoSuccess(cryptoInfo));
        return cryptoInfo;
      })
      .catch(error => dispatch(searchCryptoFailure(error)));
  };
};

 // CRYPTO SIDEBAR

 export const fetchSidebarDataBegin = () => ({
  type: FETCH_SIDEBAR_DATA_BEGIN
});

export const fetchSidebarDataSuccess = marketCap => ({
  type: FETCH_SIDEBAR_DATA_SUCCESS,
  payload: { marketCap }
});

export const fetchSidebarDataFailure = error => ({
  type: FETCH_SIDEBAR_DATA_FAILURE,
  payload: { error }
});

export const fetchSidebarData = (currency) => {
  return dispatch => {
    dispatch(fetchSidebarDataBegin());
    return axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        const marketCap = response.data;
        dispatch(fetchSidebarDataSuccess(marketCap));
        return marketCap;
      })
      .catch(error => dispatch(fetchSidebarDataFailure(error)));
  };
};




  // CRYPTO DROPDOWN

  export const fetchCoinsBegin = () => ({
    type: FETCH_COINS_BEGIN
  });
  
  export const fetchCoinsSuccess = coins => ({
    type: FETCH_COINS_SUCCESS,
    payload: { coins }
  });
  
  export const fetchCoinsFailure = error => ({
    type: FETCH_COINS_FAILURE,
    payload: { error }
  });
  
  
  export const fetchCoins = () => {
    return dispatch => {
      dispatch(fetchCoinsBegin());
      return axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(response => {
          
          const coins = response.data;
          dispatch(fetchCoinsSuccess(coins));
          return coins;
        })
        .catch(error => dispatch(fetchCoinsFailure(error)));
    };
  };

  //MARKET CHART DATA

  export const fetchCoinMarketDataStart = () => ({
    type: FETCH_COIN_MARKET_DATA_START
  });
  
  export const fetchCoinMarketDataSuccess = (coinMarketData) => ({
    type: FETCH_COIN_MARKET_DATA_SUCCESS,
    payload: coinMarketData
  });
  
  export const fetchCoinMarketDataFailure = (error) => ({
    type: FETCH_COIN_MARKET_DATA_FAILURE,
    payload: error
  });

  //fetchCoinMarketData() fuction for fetching the market data of coins
  
  export function fetchCoinMarketData(coinIds, range, currency, startTimeStamp, endTimeStamp) {
    return (dispatch) => {
      // Ensuring that coinIds is always an array, even if a single coin ID is provided
      if (!Array.isArray(coinIds)) {
        coinIds = [coinIds];
      }
  
      // If only a single coin ID is provided, fetching its market data directly and returning the Promise
      if (coinIds.length === 1) {
        const coinId = coinIds[0];
  
        let interval = "hourly";
        let dataPoints = 1;
  
        if (range === "7" || range === "30") {
          interval = "daily";
          dataPoints = range === "7" ? 7 : 10;
        } else if (range === "180" || range === "365") {
          interval = "monthly";
          dataPoints = range === "180" ? 6 : 12;
        }
  
        let url;
        if (startTimeStamp > 0 && endTimeStamp > 0) {
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency}&from=${startTimeStamp}&to=${endTimeStamp}`
        } else {
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${range}&interval=${interval}`
        }
  
        return axios.get(url)
          .then((response) => {
            dispatch({
              type: FETCH_COIN_MARKET_DATA_SUCCESS,
              payload: response.data.prices,
              coinId: coinId
            });
          })
          .catch((error) => {
            console.error("Error with API request:", error);
            dispatch({
              type: FETCH_COIN_MARKET_DATA_FAILURE,
              payload: error
            });
          });
      }
  
      // If multiple coin IDs are provided, creating an array of Promises that will be resolved after each coin market data fetch is complete
      const fetchPromises = coinIds.map((coinId) => {
        let interval = "";
        let dataPoints = 0;
  
        if (range === "7" || range === "30") {
          interval = "daily";
          dataPoints = range === "7" ? 7 : 10;
        } else if (range === "180" || range === "365") {
          interval = "monthly";
          dataPoints = range === "180" ? 6 : 12;
        }
  
        let url;
        if (startTimeStamp > 0 && endTimeStamp > 0) {
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency}&from=${startTimeStamp}&to=${endTimeStamp}`
        } else {
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${range}&interval=${interval}`
        }
  
        return axios.get(url)
          .then((response) => {
            dispatch({
              type: FETCH_COIN_MARKET_DATA_SUCCESS,
              payload: response.data.prices,
              coinId: coinId
            });
          })
          .catch((error) => {
            console.error("Error with API request:", error);
            dispatch({
  
              type: FETCH_COIN_MARKET_DATA_FAILURE,
              payload: error
            });
          });
      });
  
      // Returning a single Promise that is resolved when all the fetch Promises are resolved
      return Promise.all(fetchPromises);
    };
  }

// exchange coin 

export const fetchExchangeRates = (sellingCurrency, buyingCurrencyAbbreviation) => {
  return (dispatch) => {
    // Dispatching a fetch request action to inform the Redux store that a request is being made
    dispatch({ type: FETCH_EXCHANGE_RATES_REQUEST });
    // Logging the API request
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${sellingCurrency}&vs_currencies=${buyingCurrencyAbbreviation}`
    )
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: FETCH_EXCHANGE_RATES_SUCCESS, payload: data })
      )
      .catch((error) => {
        console.error(error);
        dispatch({
          type: FETCH_EXCHANGE_RATES_FAILURE,
          payload: "Error fetching exchange rates",
        });
      });
    };
};

