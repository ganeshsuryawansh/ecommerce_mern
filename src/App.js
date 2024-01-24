import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Productlist from "./Components/Productlist";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import User from "./Components/User";
import SearchContext from "./Components/SearchContext";

function App() {
  const [message, setMessage] = useState();
  // console.log(message);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setMessage(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data");
      });
  }, []);

  return (
    <div className="">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Productlist data={message} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Cart" element={<Cart data={message} />} />
          <Route path="/User" element={<User data={message} />} />

          <Route
            path="/ProductDetails/:productid"
            element={<ProductDetails data={message} />}
          />
          <Route
            path="/Payment/:productid"
            element={<Payment data={message} />}
          />
        </Routes>
      </SearchContext.Provider>

    </div >
  );
}

export default App;
