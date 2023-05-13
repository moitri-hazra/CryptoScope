//import statements
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrency } from '../Redux/actions';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'

const CryptoCurrency = () => {
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); //state for updating the currency
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false); // state to keep track when the dropDown menu opens
  

  const toggleDropdown = () => {
    setDropDownIsOpen(!dropDownIsOpen); //opening the DropDown when the button is clicked
  };

  const handleOptionClick = (event) => {
    setSelectedCurrency(event); 
    setDropDownIsOpen(false);
    dispatch(updateCurrency(event)); //dispatching the new updated currency
  };

  return (
    <>
      <div className="relative inline-block w-full text-left">
        <div>
          <span className="rounded-lg w-full shadow-sm">
            <button
              type="button"
              className="flex items-center h-12 rounded-lg px-4 py-2 bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={toggleDropdown}
            >
              <span>{selectedCurrency}</span>
              {dropDownIsOpen ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
            </button>
          </span>
        </div>

      {/* when the "dropDownIsOpen" set to true the dropDown menu opens */}

        {dropDownIsOpen && (
          <div className="origin-top-right absolute text-center right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <ul
              className="py-1"
              role="menu"
              aria-orientation="vertical"
            >
              <li
                key="USD"
                onClick={() => handleOptionClick("USD")}
                className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${selectedCurrency=== "USD" ? "bg-gray-100" : ""}`}
                role="menuitem"

              >
                USD
              </li>
              <li
                key="INR" onClick={() => handleOptionClick("INR")}
              className="block px-4 py-2 text-sm dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
            >
              INR
            </li>
          </ul>
        </div>
      )}
    </div>
    </>
  );
};
export default CryptoCurrency;



