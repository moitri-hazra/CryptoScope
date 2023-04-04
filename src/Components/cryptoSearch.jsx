//import Statements
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cryptoSearch } from '../Redux/actions'


const CryptoSearch = () => {
    const dispatch = useDispatch()
    const [queryText, setQueryText] = useState() //State for storing the query text entered by users
    const [results, setResults] =useState() // state for storing the filtered data from the API data which matches the query

    const { cryptoInfo, loading, error } = useSelector((state) => state.search); //redux state for the API fetched data


    useEffect(()=>{
        dispatch(cryptoSearch()); //fetching the data of 100 coins when the page loads
    }, []) // runs only when the the component renders

    useEffect(()=>{

      //filtering the API data with the query entered by the users and storing it in "filteredCryptoInfo"
      const filteredCryptoInfo = cryptoInfo.filter(info =>
        info.name.toLowerCase().includes(queryText)
    );

    setResults(filteredCryptoInfo); //setting the "results" state to the filtered data

    //if there's no query text then setting the "results" state to an empty array
    if(!queryText){
      setResults([])
    }
    },[queryText]) //runs everytime the query text changes 
    
    //getting the value of the input field to set it to "query" state
    function handleInputChange(event) {
      const query = event.target.value.trim().toLowerCase();
  
      const filteredCryptoInfo = cryptoInfo.filter(info =>
          info.name.toLowerCase().includes(query)
      );

      setQueryText(query);
     
  }


  return (
    <div className="relative bg-white dark:bg-slate-900">
      <div className='rounded-lg'>
      <input
    type="text"
    value={queryText}
    placeholder="Search Coins"
    onChange={handleInputChange} //onchange function
    className="w-[40rem] px-4 py-2 text-gray-700 placeholder-gray-400 bg-white dark:bg-slate-900 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />

      </div>
  
  <ul className="absolute top-10 w-full max-h-60 overflow-y-auto z-10 bg-white dark:bg-slate-700 rounded-md shadow-lg" >
   
   {/* if only "results" is present this code will run */}

    {results && results.map((matchedCoins)=> (
      <li key={matchedCoins.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <Link key={matchedCoins.id} to={`/crypto/${matchedCoins.id}`}><div className="flex items-center">
          <img src={matchedCoins.image} alt={matchedCoins.id} className="w-6 h-6 mr-2" />
          <span>{matchedCoins.id}</span>
        </div></Link>
      </li>
    ))}
  </ul>
</div>

  )
}

export default CryptoSearch //exporting component