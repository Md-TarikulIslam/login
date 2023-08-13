'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Loader from '@/app/components/Loader';
import { RxCross1 } from 'react-icons/rx';
import ProductsCard from '@/app/components/ProductsCard';

const BusinessProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api/products/get_products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container mx-auto'>
            <Navbar />
            <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>All Business Products</h2>
            {
                !open &&
                <>
                    {
                        loading ?
                            <div className='flex justify-center mt-52'> <Loader /> </div>
                            :
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {
                                    products.map((data, index) =>
                                        <ProductsCard
                                            key={index}
                                            data={data}
                                            setOpen={setOpen}
                                            setData={setData}
                                        />
                                    )
                                }
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
