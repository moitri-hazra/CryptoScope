import React from 'react'
import { Routes, Route } from "react-router-dom";
import CoinPage from '../Pages/CoinPage';
import Error from '../Pages/Error';
import Home from '../Pages/Home';


const Routers = () => {
  return (
    <>
    <Routes >
    <Route exact path="/" element={<Home />} />
    <Route exact path="/home" element={<Home />} />
    <Route path="/crypto/:id" element={<CoinPage/>} />
    <Route path="*" element={<Error />} />
    </Routes>
    </>
  )
}

export default Routers