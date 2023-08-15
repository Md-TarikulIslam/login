'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Loader from '@/app/components/Loader';
import RentCard from '@/app/components/Rent/RentCard';
import { RxCross1 } from 'react-icons/rx';


const RentInformation = () => {
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        area: '',
        land_type: '',
        advance_pay: 0,
        monthly_rent: 0,
        room: "",
        bathroom: "",
        kitchen: "",
        balcony: "",
        country: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        // Perform filtering based on selected options
        const filteredData = rent.filter((item) => {
            return (
                (filterOptions.area.toLowerCase() === '' || item.area.toLowerCase() === filterOptions.area.toLowerCase()) &&
                (filterOptions.monthly_rent.toLowerCase() === '' ||
                    item.monthly_rent.toLowerCase() === filterOptions.monthly_rent.toLowerCase()) &&
                (filterOptions.land_type.toLowerCase() === '' ||
                    item.land_type.toLowerCase() === filterOptions.land_type.toLowerCase()) &&
                (filterOptions.room.toLowerCase() === '' ||
                    item.room.toLowerCase() === filterOptions.room.toLowerCase()) &&
                (filterOptions.bathroom.toLowerCase() === '' ||
                    item.bathroom.toLowerCase() === filterOptions.bathroom.toLowerCase()) &&
                (filterOptions.kitchen.toLowerCase() === '' ||
                    item.kitchen.toLowerCase() === filterOptions.kitchen.toLowerCase()) &&
                (filterOptions.balcony.toLowerCase() === '' ||
                    item.balcony.toLowerCase() === filterOptions.balcony.toLowerCase()) &&
                (filterOptions.advance_pay.toLowerCase() === '' ||
                    item.advance_pay.toLowerCase() === filterOptions.advance_pay.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === '' ||
                    item.country.toLowerCase() === filterOptions.country.toLowerCase())
            );
        });

        setRent(filteredData);
        console.log(filteredData)
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios.get('/api/rent/getrent')
            .then((response) => {
                setRent(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching rent:', error);
                setLoading(false);
            });
    }, []);
    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <div className='container mx-auto min-h-screen pb-4'>
            <Navbar />
            <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>All House Info for Rent</h2>
            {
                !open &&
                <>
                    {
                        loading ?
                            <div className='flex justify-center mt-52 h-screen'> <Loader /> </div>
                            :
                            <div>
                                <div>
                                    <button
                                        onClick={openModal}
                                        className="px-4 py-2 bg-blue-700 text-white rounded"
                                    >
                                        Filter
                                    </button>

                                    {isOpen && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <h2 className="text-xl font-semibold mb-4">Filter Items</h2>


                                                <div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className='flex justify-between '>
                                                            <label>Area:</label>

                                                            <input
                                                                type="text"
                                                                name="area"
                                                                value={filterOptions.area}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between my-5'>
                                                            <label>Land Type:</label>

                                                            <input
                                                                type="text"
                                                                name="land_type"
                                                                value={filterOptions.land_type}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>

                                                        <div className='flex justify-between mt-5'>
                                                            <label>Room:</label>
                                                            <input
                                                                type="text"
                                                                name="room"
                                                                value={filterOptions.room}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Bathroom:</label>
                                                            <input
                                                                type="text"
                                                                name="bathroom"
                                                                value={filterOptions.bathroom}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Kitchen:</label>
                                                            <input
                                                                type="text"
                                                                name="kitchen"
                                                                value={filterOptions.kitchen}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Balcony:</label>
                                                            <input
                                                                type="text"
                                                                name="balcony"
                                                                value={filterOptions.balcony}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Advance Pay:</label>
                                                            <input
                                                                type="range"
                                                                name="advance_pay"
                                                                value={filterOptions.advance_pay}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Monthly Rent:</label>
                                                            <input
                                                                type="range"
                                                                name="monthly_rent"
                                                                value={filterOptions.monthly_rent}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Country:</label>
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                value={filterOptions.country}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>


                                                        <div className='flex flex-row gap-3'>
                                                            <div>
                                                                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Filter Data</button>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={closeModal}
                                                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                    {
                                        rent.map((data, index) =>
                                            <RentCard
                                                key={index}
                                                data={data}
                                                setOpen={setOpen}
                                                setData={setData}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                    }
                </>
            }
            {
                open &&
                <div className="bg-slate-800 bg-opacity-90 absolute top-0 left-0 w-full h-full flex justify-center lg:items-center p-2 overflow-y-scroll">
                    <div className='bg-white h-fit container mx-auto rounded-md relative p-4'>
                        <RxCross1 onClick={() => setOpen(false)} className='absolute top-2 right-2 cursor-pointer' />
                        <div className='flex flex-col items-center gap-4 text-lg'>
                            <div className='flex justify-center'>
                                <img className='w-full md:w-[75%] lg:w-[40%] object-cover rounded-md' src={data.photo} alt="photo" />
                            </div>
                            <div className='flex gap-4 w-full justify-center flex-col lg:flex-row'>
                                <div className='flex-1 border-[1px] border-slate-300 p-4 rounded-md'>
                                    <p>Area: <span className='font-semibold'>{data.area}</span></p>
                                    <p>Land Type: <span className='font-semibold'> {data.land_type}</span></p>
                                    <p>Advance Pay: <span className='font-semibold'> {data.advance_pay}</span></p>
                                    <p>Monthly Rent: <span className='font-semibold'> {data.monthly_rent}</span></p>
                                    <p>Number of Rooms: <span className='font-semibold'> {data.room}</span></p>
                                    <p>Number of Bathrooms: <span className='font-semibold'> {data.bathroom}</span></p>
                                    <p>Number of Kitchen: <span className='font-semibold'> {data.kitchen}</span></p>
                                    <p>Number of Balcony: <span className='font-semibold'> {data.balcony}</span></p>
                                </div>
                                <div className='flex-1 border-[1px] border-slate-300 p-4 rounded-md'>
                                    <p><span className='font-semibold'>Address:</span></p>
                                    <p>Street: <span className='font-semibold'> {data.street}</span></p>
                                    <p>City/Town: <span className='font-semibold'> {data.city}</span></p>
                                    <p>State: <span className='font-semibold'> {data.state}</span></p>
                                    <p>Postal Code: <span className='font-semibold'> {data.postal_code}</span></p>
                                    <p>Country: <span className='font-semibold'> {data.state}, {data.country}</span></p>
                                </div>
                            </div>
                            <div className='border-[1px] border-slate-300 p-4 rounded-md w-full'>
                                <p className='font-semibold'>Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                </div>
                            </div>
                            <div className='border-[1px] border-slate-300 w-full p-4 rounded-md'>
                                <p className='font-semibold'>Message / Additional Information:</p>
                                <p>{data?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default RentInformation;
