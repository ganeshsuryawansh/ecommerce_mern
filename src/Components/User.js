import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const User = ({ data }) => {
    const [User, setUser] = useState();
    const [Payment, setPayment] = useState();
    const email = sessionStorage.getItem("User");

    console.log(Payment);

    useEffect(() => {
        //fetch user data
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/fetch-user?email=${email}`
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching User :", error);
            }
        };
        fetchUser();

        const fetchUserPayment = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/fetch-user-payment?email=${email}`
                );
                setPayment(response.data);
            } catch (error) {
                console.error("Error fetching User :", error);
            }
        };
        fetchUserPayment()



    }, [email]);


    return (
        <div className="flex flex-col  sm:px-24 p">
            <div>
                {User ? (
                    <div className="w-52 mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="overflow-hidden">
                            <img className="w-52 h-48 object-cover object-center" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="User Avatar" />
                        </div>
                        <div className="p-6">
                            <h1 className="text-xl font-semibold text-gray-800">{User.name}</h1>
                            <p className="mt-2 text-sm text-gray-600">Email: {User.email}</p>
                            <p className="mt-2 text-sm text-gray-600">Phone: {User.phone}</p>
                            <p className="mt-2 text-sm text-gray-600">Address: {User.address}</p>
                        </div>
                    </div>
                ) : null}

            </div>
            <div className="pt-10 text-center">
                Order Details

                <div class="min-w-full bg-white overflow-auto">
                    <table class="min-w-full leading-normal ">
                        <thead>
                            <tr>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Product Name
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Token
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payment Id
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {Payment && Payment.map((p) => {
                                return (<>
                                    <tr>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {p.prdName?p.prdName:"null"}
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {p.email}
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {p.token}
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {p.datetime}
                                        </td>
                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {p.Paymentid}
                                        </td>
                                    </tr>
                                </>)
                            })}



                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default User