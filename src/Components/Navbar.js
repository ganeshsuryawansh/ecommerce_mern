import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import Productlist from "./Productlist";
import SearchContext from "./SearchContext";


const Navbar = () => {
    const { setSearch } = useContext(SearchContext);
    const user = sessionStorage.getItem("User");
    const [search, SetSe] = useState(null);

    function SendToChild() {
        console.log("inside nav func",search);

        if(search){
           setSearch(search);
        }else{
            setSearch(null)
        }
    }

  
    return (
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" class="flex items-center">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        <i>
                            <span className="text-red-500">Shop</span>Mart
                        </i>
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span class="sr-only">Open main menu</span>
                    <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to={"/"}
                                class="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/Cart"}
                                class="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                            >
                                Cart
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <Link to={"/User"}>{user}</Link>
                            ) : (
                                <Link
                                    to={"/Signup"}
                                    class="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                >
                                    Signup
                                </Link>
                            )}{" "}
                        </li>
                        <li>
                            {user ? (
                                ""
                            ) : (
                                <Link
                                    to={"/Login"}
                                    class="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                >
                                    Login
                                </Link>
                            )}{" "}
                        </li>
                        <li>
                            <input type="text" value={search} onChange={e=>SetSe(e.target.value)} name="query"  placeholder="eg.watch" className="rounded focus:outline-none h-8" />
                            <button onClick={()=>SendToChild()} className="bg-red-400 text-white rounded h-8 px-3 mx-2">Search</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
