import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import SearchContext from "./SearchContext";
import ProductlistSkeleton from "./ProductlistSkeleton";

const Productlist = ({ data }) => {
    const navigate = useNavigate();
    const user = sessionStorage.getItem('User');
    const { search } = useContext(SearchContext);
    const [serP, setSerP] = useState([]);//serch product
    const [rangeValue, setRangeValue] = useState(0);
    const [filterdata, setFilterData] = useState([]);
    const [cate, setCate] = useState([]);

    // console.log("=====>", serP);
    // console.log(data);
    console.log(cate);


    useEffect(() => {
        const cat = data && data.map(p => p.category);
        const uniqueCat = [...new Set(cat)];
        setCate(uniqueCat);
    }, [data])


    function categorywiseData(c) {
        const dt = data && data.filter(p => p.category === c);
        console.log("categorywiseData=>", dt);
        setFilterData(dt)
    }

    function handleRangeChange(event) {
        setRangeValue(event.target.value);
    }

    useEffect(() => {
        if (data) {
            const product = data.filter(p => p.price < rangeValue);
            setFilterData(product);
        }
    }, [rangeValue, data]);

    useEffect(() => {
        if (search && data) {
            // const matchedProducts = data.filter(p => p.title.includes(search));
            const matchedProducts = data.filter(p => (p.title || p.description).toLowerCase().includes(search.toLowerCase()));
            setFilterData(matchedProducts);
        } else {
            setSerP([]);  // Reset to empty array if search is empty
        }
    }, [search, data]);


    const addProductToCart = async (pid) => {
        console.log(pid);
        console.log(user);
        if (user != null) {
            const docRef = {
                _pid: pid,
                email: user,
                token: pid + "_" + user
            };

            try {
                const response = await axios.post('http://localhost:5000/Send-Cart', docRef);
                console.log(response.data);
            } catch (error) {
                console.error("Error sending data:", error);
            };
        } else {
            navigate('/Login');
        }

    }

    return (
        <div className="flex flex-col sm:flex-row relative h-screen">
            <div className="sm:w-1/5 flex flex-col outline-none pt-5 bg-gray-300">
                <p className="text-center">Filters</p>
                <div className="flex flex-row outline-none text-center justify-center">
                    <div className="pt-1">
                        <p>{0}</p>
                    </div>
                    <div>
                        <input
                            className="w-52 bg-gray-200 focus:outline-none h-1 m-2"
                            type="range"
                            min="0"
                            max="100000"
                            step="500"
                            value={rangeValue}
                            onChange={handleRangeChange}
                        />
                    </div>
                    <div className="pt-1">
                        <p>{rangeValue}</p>
                    </div>
                </div>
                <p className="text-center my-3">Category's</p>
                <div className="flex flex-row justify-center">
                    <div>
                        {cate && cate.map((p) => {
                            return (
                                <div className="text-center hidden sm:flex">
                                    <button onClick={() => categorywiseData(p)} className="bg-red-500 text-white px-2 my-2 pb-1 rounded">{p}</button><br />
                                </div>

                            )
                        })}
                        <select className="block sm:hidden" onChange={(e) => categorywiseData(e.target.value)}>
                            {cate && cate.map((p, index) => (
                                <option key={index} value={p}>
                                    {p}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            <div className="sm:w-4/5 h-full overflow-y-auto flex flex-row flex-wrap">
                {/* This section is only for filters data Range value, category, search products */}
                <div className="flex flex-row flex-wrap mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
                    {filterdata && filterdata.map((product, index) => {
                        return (
                            <>
                                {/** Desktop view */}
                                <div key={index} className="hidden sm:block  mx-2 my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
                                    <Link to={`/ProductDetails/${product._id}`}>
                                        <div className="flex items-center justify-center w-64 h-72">
                                            <img
                                                className="rounded-t-lg object-cover w-full h-full"
                                                src={product.thumbnail}
                                                alt=""
                                            />
                                        </div>
                                    </Link>

                                    <div className="p-5">
                                        <Link to={`/ProductDetails/${product._id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {product.title.slice(0, 15)}
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            ₹{product.price}
                                            </p>
                                        </Link>

                                        <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button>
                                    </div>
                                </div>


                                {/** mobile view */}
                                <div className="lg:px-64 flex sm:hidden px-2 border-2 border-solid border-gray-200">
                                    <div className="flex w-100 flex-row justify-between items-center  my-2 rounded Montserrat">
                                        <div className="flex flex-col w-2/3 pr-14">
                                            <Link to={`/ProductDetails/${product._id}`}>
                                                <h5 className="mb-2 text-1xl lg:text-4xl font-bold Montserrat tracking-tight text-gray-900">
                                                    {product.title}
                                                </h5>
                                            </Link>

                                            <div className="flex flex-row justify-between">
                                                <div className="flex flex-row justify-between">
                                                    <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button>

                                                    <p className="pt-3 px-1">₹{product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4 overflow-hidden lg:h-64">
                                            <Link to={`/ProductDetails/${product._id}`}>
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={product.thumbnail}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })}
                </div>

                {/* All products  */}
                {data && data ? (
                    <div className="flex flex-row flex-wrap mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">

                        {data &&
                            data.map((product, index) => {
                                return (
                                    <>
                                        {/** Desktop view */}

                                        <div key={index} className="hidden sm:block  mx-2 my-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
                                            <Link to={`/ProductDetails/${product._id}`}>
                                                <div className="flex items-center justify-center w-64 h-72">
                                                    <img
                                                        className="rounded-t-lg object-cover w-full h-full"
                                                        src={product.thumbnail}
                                                        alt=""
                                                    />
                                                </div>
                                            </Link>

                                            <div className="p-5">
                                                <Link to={`/ProductDetails/${product._id}`}>
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                        {product.title.slice(0, 15)}
                                                    </h5>
                                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    ₹{product.price}
                                                    </p>
                                                </Link>

                                                <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button>
                                            </div>
                                        </div>


                                        {/** mobile view */}
                                        <div className="lg:px-64 flex sm:hidden px-2 border-2 border-solid border-gray-200">
                                            <div className="flex w-100 flex-row justify-between items-center  my-2 rounded Montserrat">
                                                <div className="flex flex-col w-2/3 pr-14">
                                                    <Link to={`/ProductDetails/${product._id}`}>
                                                        <h5 className="mb-2 text-1xl lg:text-4xl font-bold Montserrat tracking-tight text-gray-900">
                                                            {product.title}
                                                        </h5>
                                                    </Link>

                                                    <div className="flex flex-row justify-between">
                                                        <div className="flex flex-row justify-between">
                                                            <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button>

                                                            <p className="pt-3 px-1">₹{product.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/4 overflow-hidden lg:h-64">
                                                    <Link to={`/ProductDetails/${product._id}`}>
                                                        <img
                                                            className="object-cover w-full h-full"
                                                            src={product.thumbnail}
                                                            alt=""
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                ) : (
                    Array(20).fill().map((_, i) => <ProductlistSkeleton key={i} />)
                )}
            </div>
        </div>
    );
};

export default Productlist;
