import { FETCH_COINS_BEGIN,FETCH_COINS_SUCCESS,FETCH_COINS_FAILURE } from './constants';
import { SEARCH_CRYPTO_BEGIN, SEARCH_CRYPTO_SUCCESS, SEARCH_CRYPTO_FALIURE } from './constants';
import { UPDATE_CURRENCY } from './constants';
import { FETCH_COIN_MARKET_DATA_START, FETCH_COIN_MARKET_DATA_SUCCESS, FETCH_COIN_MARKET_DATA_FAILURE } from './constants';
import { FETCH_SIDEBAR_DATA_BEGIN, FETCH_SIDEBAR_DATA_SUCCESS, FETCH_SIDEBAR_DATA_FAILURE } from './constants';
import { FETCH_EXCHANGE_RATES_FAILURE, FETCH_EXCHANGE_RATES_REQUEST, FETCH_EXCHANGE_RATES_SUCCESS } from "./constants";

const initialState = {
    loading: false,
    coins: [],
    error: '',
    currency: 'usd',
    searchResults: [],
    coinsChart: '',
  };

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CURRENCY:
        return {
          ...state,
          currency: action.currency,
        };

        default:
          return state;
      }
}

const cryptoSearchInitialState = {
  cryptoInfo: [],
  loading: false,
  error: null
};

export function cryptoSearchReducer(state = cryptoSearchInitialState, action) {
  switch (action.type) {
    case SEARCH_CRYPTO_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SEARCH_CRYPTO_SUCCESS:
      return {
        ...state,
        loading: false,
        cryptoInfo: action.payload.cryptoInfo
      };
    case SEARCH_CRYPTO_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        cryptoInfo: []
      };
    default:
      return state;
  }
}


//Crypto SideBar
const sidebarInitialState = {
  marketCap: [],
  loading: false,
  error: null
};

export function sidebarReducer(state = sidebarInitialState, action) {
  switch (action.type) {
    case FETCH_SIDEBAR_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SIDEBAR_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        marketCap: action.payload.marketCap
      };
    case FETCH_SIDEBAR_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        marketCap: []
      };
    default:
      return state;
  }
}


const dropDownInitialState = {
  coins: [],
  loading: false,
  error: null
};

export function coinReducer(state = dropDownInitialState, action) {
  switch (action.type) {
    case FETCH_COINS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_COINS_SUCCESS:
      return {
        ...state,
        loading: false,
        coins: action.payload.coins
      };
    case FETCH_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        coins: []
      };
    default:
      return state;
  }
}

//MARKET CAHRT

const marketChartinitialState = {
  coinMarketData: [],
  loading: false,
  error: '',
};

//reducer

export function coinMarketDataReducer (state = marketChartinitialState, action) {
  switch (action.type) {
    case FETCH_COIN_MARKET_DATA_START:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_COIN_MARKET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        coinMarketData: action.payload,
      };
    case FETCH_COIN_MARKET_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


// exchange crypto

 // Define the initial state for the exchange rate reducer
 const exchangeInitialState = {
  loading: false,
  exchangeRate: 0,
  supportedVsCurr: [ "btc","eth", "ltc", "bch", "bnb", "eos", "xrp", "xlm", "link", "dot", "yfi", "usd", "aed", "ars", "aud", "bdt", "bhd",
  "bmd","brl", "cad","chf", "clp", "cny", "czk", "dkk", "eur", "gbp", "hkd", "huf", "idr", "ils",  "inr", "jpy", "krw", "kwd", "lkr","mmk", "mxn", "myr","ngn", "nok","nzd", "php", "pkr", "pln",
  "rub", "sar", "sek", "sgd", "thb", "try", "twd", "uah","vef","vnd","zar", "xdr", "xag", "xau","bits", "sats"],
  error: null
};

// Define the exchange rate reducer function
export const exchangeRateReducer = (state = exchangeInitialState, action) => {
  switch (action.type) {
    case FETCH_EXCHANGE_RATES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_EXCHANGE_RATES_SUCCESS:
      return {
        ...state,
        exchangeRate: action.payload,
        loading: false,
        error: null
      };
    case FETCH_EXCHANGE_RATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

// Currency converter

const currencyInitialState = {
  currency: 'USD',
};









  