import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Payment = ({ data }) => {
    const user = sessionStorage.getItem('User');
    const [userData, setUserData] = useState({});
    const scriptLoaded = useRef(false);
    const { productid } = useParams();
    const navigate = useNavigate();

    console.log(userData.name);

    if (user === null) {
        navigate('/Login');
    }

    const addPaymentDetails = async (productid, pid) => {
        console.log(pid);
        console.log(user);

        const docRef = {
            _pid: productid,
            email: user,
            token: productid + "_" + user,
            datetime: Date(),
            Paymentid: pid,
            price: data.price,
            prdName:sessionStorage.getItem("PrdName")
        };

        try {
            const response = await axios.post('http://localhost:5000/Send-Payment', docRef);
            console.log(response.data);
        } catch (error) {
            console.error("Error sending data:", error);
        };
    }

    useEffect(() => {
        const fetchUserByEmail = async (email) => {
            try {
                const response = await axios.get('http://localhost:5000/fetch-user', {
                    params: {
                        email: email
                    }
                });
                console.log(response.data);  // This will log the user data
                setUserData(response.data)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUserByEmail(user)
    }, [user])

    //payment api call
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => scriptLoaded.current = true;
        document.body.appendChild(script);
    }, []);


    const handlePayment = (productid, price) => {
        if (!scriptLoaded.current) {
            return console.log('Payment gateway script is still loading, please wait a moment and try again.');
        }

        const options = {
            "key": "rzp_test_patmvnydyLHSDt",
            "amount": price * 100, // amount in smallest currency unit
            "currency": "INR",
            "name": "ShopMart",
            "description": data.title,
            //"image": "https://example.com/your_logo.jpg",
            "handler": function (response) {

                if (response.razorpay_payment_id) {
                    addPaymentDetails(productid, response.razorpay_payment_id);
                    // setPayment(true);
                     navigate(`/User`);
                    //window.location.reload();
                }
            },
            "prefill": {
                "name": userData.name,
                "email": user,
                "contact": userData.phone
            },
            "theme": {
                "color": "#F37254"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };




    return (
        <div>
            <h1 className='text-center text-xl'>Payment Details</h1>

            {data && data.map((data) => {
                return (<>
                    {productid === data._id ?
                        <div className='flex justify-center items-center sm:flex-row flex-col px-2 rounded-xl pt-20'>
                            <div className="flex justify-center items-center ">
                                <img className="rounded-lg h-64 w-52 sm:w-full sm:h-full" src={data.thumbnail} alt="" />
                            </div>
                            <div className='sm:pl-32'>
                                <h1 className='text-2xl'>{userData.name} </h1>
                                <h3 className='text-xl'> {userData.email}</h3>
                                <h4 className=''>{userData.phone}</h4>
                                <hr/>{sessionStorage.setItem('PrdName',data.title)}
                                <h3 className='text-xl'> {data.title}</h3>
                                <h3 className='text-xl'> ₹{data.price}</h3>

                                {/* <ReactStars
                                  count={5}
                                  value={3.5}
                                  size={24}
                                  color2={"#ffd700"} // color of filled stars
                                  edit={false} // if you want to make the stars read-only
                                /> */}
                                
                                <span className='flex flex-row mt-10'>
                                    <p className='bg-green-500 w-fit px-2  mr-2'>{data.brand}</p>
                                    <p className='bg-yellow-500 w-fit px-2 '>Qt: {data.stock}</p>
                                </span>
                                <p className='text-blue-500'>Free Delivery</p>
                                <span className='flex flex-row'>

                                    <button onClick={() => handlePayment(data._id, data.price)} className='bg-orange-500 px-2  mx-1 py-2 my-5'>Proceed To Payment</button>
                                </span>
                            </div>
                        </div> : ""}
                </>)
            })
            }    </div>
    )
}

export default Payment