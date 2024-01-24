import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import ReactStars from 'react-stars';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const { productid } = useParams();
  const [counter, setCounter] = useState(0);
  const [Relprd, setRelprd] = useState([]);
  const [cate, setcate] = useState("");
  const navigate = useNavigate();



  //console.log(data);
  const user = sessionStorage.getItem('User');


  useEffect(() => {//get current product category
    if (data && data.length > 0) {
      const relevantData = data.find(item => item._id === productid);
      if (relevantData) {
        setcate(relevantData.category);
      }
    }
  }, [data, productid]);

  useEffect(() => {//Related Products
    const dt = data && data.filter(p => p.category === cate);
    // console.log("categorywiseData=>", dt);
    setRelprd(dt);
  }, [data, cate])


  //add Products to cart
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


  useEffect(() => {//image change 
    const intervalID = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter >= 3) {
          return 0; // Reset to 0 if counter reaches 4
        }
        return prevCounter + 1;
      });
    }, 3000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalID);
    };
  }, []);


  return (
    <div>
      {
        data && data.map((data) => {
          return (<>
            {productid === data._id ?
              <div className='flex justify-center items-center sm:flex-row flex-col px-2 rounded-xl pt-20'>
                <div className="flex justify-center items-center overflow">
                  <img className="rounded-lg h-64 w-52 sm:w-96 sm:h-96" src={data.images[counter] ? data.images[counter] : data.images[0]} alt="" />
                </div>
                <div className='sm:pl-32'>
                  <h1 className='text-2xl'>{data.title} </h1>
                  <h3 className='text-xl'> ₹{data.price}</h3>
                  <ReactStars
                    count={5}
                    value={3.5}
                    size={24}
                    color2={"#ffd700"} // color of filled stars
                    edit={false} // if you want to make the stars read-only
                  />
                  <h4 className=''>{data.description}</h4>
                  <span className='flex flex-row mt-10'>
                    <p className='bg-green-500 w-fit px-2 rounded-lg mr-2'>{data.brand}</p>
                    <p className='bg-yellow-500 w-fit px-2 rounded-lg'>Qt: {data.stock}</p>
                  </span>
                  <p className='text-blue-500'>Free Delivery</p>
                  <span className='flex flex-row my-5'>
                    <button onClick={() => addProductToCart(data._id)} className='bg-orange-400 px-4 py-3 mx-1 '>Add To Cart</button>
                    {
                      user ? <Link to={`/Payment/${data._id}`} className='bg-yellow-500 px-2 pt-3 mx-1 '>
                        <button >
                          Buy Now
                        </button>
                      </Link> : <Link to={`/Login`} className='bg-yellow-500 px-2 pt-3 mx-1 '>
                        <button >
                          Buy Now
                        </button>
                      </Link>}
                  </span>
                </div>
              </div> : ""}
          </>)
        })
      }
<hr/>
<h1 className="text-center text-2xl">Related Products...</h1>
      <div className="sm:w-full px-10 h-full overflow-y-auto flex flex-row flex-wrap">
        {/* This section is only for filters data Range value, category, search products */}
        <div className="flex flex-row flex-wrap mx-2 my-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
          {Relprd && Relprd.map((product, index) => {
            return (
              <>
                {/** Desktop view */}
                <div key={index} className="hidden sm:block  mx-2 my-2 px-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white justify-center">
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

                    {/* <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button> */}
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
                          {/* <button onClick={() => addProductToCart(product._id)} className=""><AddShoppingCartIcon /></button> */}

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
      </div>
    </div>
  );
};

export default ProductDetails;
