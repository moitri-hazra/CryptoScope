//import statements
import { HiMoon, HiSun } from "react-icons/hi";
import block from '../image/block.png'
import { useEffect, useState } from 'react';


const Header = () => {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark"){
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  return (
    <div className='shadow-md w-full bg-white dark:bg-slate-900 flex justify-center'> 
      <div className='flex container p-4  justify-between'>
        <div className="flex items-center"> 
        <img src={block} alt="icon" className="w-8 h-8"/> <h1 className="font-bold px-2">CRYPTOSCOPE</h1>
        </div>
        <button className="border shadow-md h-10 w-10 rounded-md dark:bg-slate-800" onClick={handleThemeSwitch}>
        {theme === "dark" ? (
          <span><HiSun className="text-xl mx-auto text-yellow-400"/></span>
        ) : (
          <span> <HiMoon className="text-xl mx-auto"/></span>
          )}
        </button>
      </div>
    </div>
    
  )
}

export default Header