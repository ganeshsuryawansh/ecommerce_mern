import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Cart = ({ data }) => {
    const [items, setItems] = useState([]);
    const email = sessionStorage.getItem("User");
    const [userdata, setUserdata] = useState([]);
    const [quantity, setQuantity] = useState(0);
    let [totPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    console.log(userdata);

    if (email === null) {
        navigate('/Login');
    } else {
        //console.log("hello"); 
    }

    function Inc(id,price) {
        console.log(id);
        let q = quantity + 1;
        if (q > 0) {
            setQuantity(q);
        }
        let prc = totPrice + price;
        setTotalPrice(totPrice + prc)
    }

    function Dec(id,price) {
        console.log(id);
        let q = quantity - 1;
        if (q > 0) {
            setQuantity(q);
            let prc = totPrice - price;
            setTotalPrice(prc)
        }
    }

    //fetch cart data
    const fetchCart = async () => {
        if (items.length === 0) { // Fetch only if items is empty or on initial mount
            try {
                const response = await axios.get(
                    `http://localhost:5000/Get-Cart?email=${email}`
                );
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                //alert("Error fetching cart. Please try again.");
            }
        }
    };

    useEffect(() => {
        if (userdata) {
            const sum = userdata.reduce((acc, p) => acc + p.price, 0);
            setTotalPrice(sum);
        }
    }, [userdata, totPrice]);


    //remove from cart
    const removeProductFromCart = async (product, pid, price) => {
        userdata.splice(product, 1);
        setTotalPrice(totPrice - price);

        const tokenToRemove = pid + "_" + email;
        const payload = {
            token: tokenToRemove
        };
        try {
            const response = await axios.post('http://localhost:5000/Remove-Cart', payload);
            console.log(response.data);
            // window.location.reload()

        } catch (error) {
            console.error("Error removing product from cart:", error);
        };
        navigate('/Cart');
    }

    //if email change cart data again load
    useEffect(() => {
        fetchCart();
    }, [email,data]); // Only dependent on email.

    useEffect(() => {
        if (data && items) {
            const matchedProducts = data.filter(product => items.some(item => item._pid === product._id));
            setUserdata(matchedProducts);
        }
    }, [data, items]); // Separate effect to derive userdata from data and items

    //card desc limeted content
    function truncateDesc(str, length = 100) {
        if (!str) return "";
        return str.length <= length ? str : `${str.slice(0, length)}...`;
    }


    useEffect(() => {
        if (data && items) {
            const matchedProducts = data.filter(product => items.some(item => item._pid === product._id))
                .map(product => ({ ...product, quantity: 1 })); // initialize each product with quantity 1
            setUserdata(matchedProducts);
        }
    }, [data, items]);


    return (
        <div className="flex flex-col sm:flex-row relative h-screen">
            <div className="sm:w-1/5 flex flex-col outline-none pt-5 bg-gray-300">
                ₹{totPrice}
            </div>
            <div className="sm:w-4/5 h-full overflow-y-auto flex flex-row flex-wrap">
                {(userdata.length > 0) ? "" : <h1 className="text-center text-xl">Don't Have any Product....</h1>}
                {
                    userdata.map((product) => {
                        return (<>
                            <div key={product.id} className="lg:px-64">
                                <div className="rounded hover:bg-gray-100 my-2 flex w-100 flex-row justify-between px-2 items-center Montserrat border-2 border-solid border-gray-200">
                                    <div className="flex flex-col w-2/3 pr-14">
                                        <Link to={`/ProductDetails/${product._id}`}>
                                            <h5 className="mb-2 text-1xl lg:text-2xl font-bold Montserrat tracking-tight text-gray-900">{product.title}</h5>
                                            <p className='hidden sm:block'>{truncateDesc(product.description)}</p>
                                        </Link>
                                        <div className="flex flex-row justify-between">
                                            <p className="py-1 text-xl text-blue-500">₹{product.price * quantity}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <button className='bg-yellow-500 rounded p-1' onClick={() => removeProductFromCart(product, product._id, product.price)}>Remove From Cart</button>
                                        </div>
                                        <div className="flex flex-row w-32 justify-between px-3 my-3">
                                            <button onClick={() => Dec(product.id, product.price)} className="bg-gray-400 w-5 py-0 rounded">-</button>
                                            {product.quantity}
                                            <button onClick={() => Inc(product.id, product.price)} className="bg-gray-400 w-5 py-0 rounded">+</button>
                                        </div>
                                    </div>
                                    <div className="w-1/4 overflow-hidden lg:h-64">
                                        <Link to={`/ProductDetails/${product._id}`}>
                                            <img className="object-cover w-full h-full" src={product.thumbnail} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div></>)
                    })}
            </div>
        </div>
    );
};

export default Cart;
