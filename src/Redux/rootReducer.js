import { combineReducers } from 'redux';
import { coinReducer, coinMarketDataReducer, sidebarReducer, currencyReducer, cryptoSearchReducer} from './reducers.js';
import { exchangeRateReducer } from './reducers.js';


//combining reducers
const rootReducer = combineReducers({
  coins: coinReducer,
  marketData: coinMarketDataReducer,
  sidebar: sidebarReducer,
  currency: currencyReducer,
  search: cryptoSearchReducer,
  exchange: exchangeRateReducer
});

export default rootReducer;
