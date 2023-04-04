import React, { useEffect } from 'react';
import axios from 'axios';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { fetchSidebarData } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Sidebar() {
  const dispatch = useDispatch()
  const { marketCap, loading, error } = useSelector((state) => state.sidebar); 
  const {currency} = useSelector(state => state.currency);

  useEffect(() => {
   dispatch(fetchSidebarData(currency))
  }, [currency]);

  //checking if the redux state is loading then rendering "loading" is yes.
  if (loading) {
    return <div>Loading...</div>;
  }

  //rendering error is theres any error in redux state
  if (error) {
    return <div>Error: {error || error.message}</div>;
  }

  return (
    <div className="rounded-lg card w-96 h-[55rem] overflow-y-auto bg-white dark:bg-slate-900">
  <div className="max-h-96">
    <div className="sticky top-0 bg-white dark:bg-slate-900 z-10" >
      <h1 className="flex text-xl font-bold px-4 py-2">Cryptocurrency by market cap</h1>
    </div>
    {/* using map function */}
    {marketCap.map((post) => {
     
      return (
        <div
          key={post.id}
          className="grid grid-cols-3 md:grid-cols-3 font-light p-2 rounded border-gray-300 border-b hover:bg-gray-300"
        >
          <div className="flex items-center gap-3">
            <img className="text-center w-9" src={post.image} alt={post.name} />
            <div className="w-50%">
              <p className="flex text-base font-medium pr-7">{post.name}</p>
              <span className="text-left text-base "><div>Market Cap</div> <div>{post.market_cap}</div></span>
            </div>
          </div>
          <div>
            <div className="flex pl-20">
              <span
                className={`flex text-center gap-4 ${
                  post.price_change_percentage_24h < 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {post.price_change_percentage_24h < 0 ? <FaCaretDown /> : <FaCaretUp />}
                {post.price_change_percentage_24h.toFixed(3)}%
              </span>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>


  );
}

export default Sidebar;
