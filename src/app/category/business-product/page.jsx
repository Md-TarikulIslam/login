'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Loader from '@/app/components/Loader';
import { RxCross1 } from 'react-icons/rx';
import ProductsCard from '@/app/components/Products/ProductsCard';

const BusinessProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        products_price: '',
        state: "",
        city: "",
        country: '',
        selling_price: ""

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        // Perform filtering based on selected options
        const filteredData = products.filter((item) => {
            return (
                (filterOptions.products_price.toLowerCase() === '' ||
                    item.products_price.toLowerCase() === filterOptions.products_price.toLowerCase()) &&
                (filterOptions.state.toLowerCase() === '' ||
                    item.state.toLowerCase() === filterOptions.state.toLowerCase()) &&
                (filterOptions.city.toLowerCase() === '' ||
                    item.city.toLowerCase() === filterOptions.city.toLowerCase()) &&
                (filterOptions.selling_price.toLowerCase() === '' ||
                    item.selling_price.toLowerCase() === filterOptions.selling_price.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === '' ||
                    item.country.toLowerCase() === filterOptions.country.toLowerCase())
            );
        });

        setFilteredData(filteredData);
        console.log(filteredData)
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios.get('/api/business/getbusiness')
            .then((response) => {
                setProducts(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);
    const openModal = () => {
        setIsOpen(true);
    };


    return (
        <div className='container mx-auto min-h-screen pb-4'>
            <Navbar />
            <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>All Business Products</h2>
            {
                !open &&
                <>
                    {
                        loading ?
                            <div className='flex justify-center mt-52'> <Loader /> </div>
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
                                                        <div className='flex justify-between mt-5'>
                                                            <label>State:</label>
                                                            <input
                                                                type="text"
                                                                name="state"
                                                                value={filterOptions.state}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>City:</label>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                value={filterOptions.city}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-52'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between my-5'>
                                                            <label>Products Price:</label>

                                                            <input
                                                                type="range"
                                                                name="products_price"
                                                                value={filterOptions.products_price}
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
                                        filteredData.map((data, index) =>
                                            <ProductsCard
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
                                    <p>Number of Products: <span className='font-semibold'>{data.products_quantity}</span></p>
                                    <p>Product Price: <span className='font-semibold'> {data.products_price}</span></p>
                                    {
                                        data.company_name && <p>Company Name: <span className='font-semibold'> {data.company_name}</span></p>
                                    }
                                    {
                                        data.company_registered_address && <p>Company Registered Address: <span className='font-semibold'> {data.company_registered_address}</span></p>
                                    }
                                </div>
                                <div className='flex-1 border-[1px] border-slate-300 p-4 rounded-md'>
                                    <p><span className='font-semibold'>Address:</span></p>
                                    <p>Street: <span className='font-semibold'> {data.street}</span></p>
                                    <p>City/Town: <span className='font-semibold'> {data.city}</span></p>
                                    <p>State: <span className='font-semibold'> {data.state}</span></p>
                                    <p>Postal Code: <span className='font-semibold'> {data.postal_code}</span></p>
                                    <p>Sate: <span className='font-semibold'> {data.state}</span></p>
                                    <p>Country: <span className='font-semibold'> {data.country}</span></p>
                                </div>
                            </div>
                            <div className='border-[1px] border-slate-300 p-4 rounded-md w-full'>
                                <p className='font-semibold'>Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    {
                                        data?.company_website_url &&
                                        <p>Website URL: <a href={`http://${data?.company_website_url}`} target="_blank" rel="noopener noreferrer">{data?.company_website_url}</a></p>
                                    }
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

export default BusinessProducts;
