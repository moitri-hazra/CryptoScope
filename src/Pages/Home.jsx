import React, { Fragment } from 'react'
import Header from '../Components/Header'
import CurrencyConverter from '../Components/cryptoCurrency';
import Sidebar from '../Components/cryptoSideBar';
import Footer from '../Components/Footer';
import CoinChart from '../Components/coinCharts';
import CryptoSearch from '../Components/cryptoSearch';
import ExchangeDashboard from '../Components/ExchangeDashboard';
import Portfolio from '../Components/Portfolio';
import CryptoCurrency from '../Components/cryptoCurrency';

const Home = () => {
  return (
    <Fragment>
      <div className="bg-white dark:bg-slate-900">
        <Header />
        <div className='bg-indigo-100 dark:bg-slate-800 bg-opacity-95  w-full container rounded-lg block mx-auto p-4 md:p-8 mt-6 md:my-6'>
          <div className="grid grid-cols-9 mb-4 justify-center gap-4">
            <div className="col-span-full lg:col-span-6">
              <div className="grid gap-4 grid-cols-6">
                <div className="col-span-2 lg:col-span-1">
                  <CryptoCurrency />
                </div>
                <div className="col-span-6 dark:bg-slate-900 lg:col-span-5">
                  <CryptoSearch />
                </div>
                <div className="col-span-full bg-white rounded-lg">
                  <CoinChart />
                </div>
                <div className="col-span-full flex gap-4">
                  <div className="bg-white dark:bg-slate-900  rounded-lg h-[20rem] w-1/2"><Portfolio /></div>
                  <div className="bg-white dark:bg-slate-900  rounded-lg h-[20rem] w-[30rem]"><ExchangeDashboard /></div>
                </div>
              </div>

            </div>
            <div className='col-span-full lg:col-span-3'><Sidebar /></div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Home