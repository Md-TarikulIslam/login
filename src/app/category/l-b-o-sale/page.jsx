'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Loader from '@/app/components/Loader';
import { RxCross1 } from 'react-icons/rx';
import SalesCard from '@/app/components/Sales/SalesCard';

const SalesInformation = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api/sales/getsales')
            .then((response) => {
                setSales(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching sales:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container mx-auto min-h-screen pb-4'>
            <Navbar />
            <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>All Property Info for sales</h2>
            {
                !open &&
                <>
                    {
                        loading ?
                            <div className='flex justify-center mt-52'> <Loader /> </div>
                            :
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {
                                    sales.map((data, index) =>
                                        <SalesCard
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
                                    <p>Property Owner: <span className='font-semibold'>{data.property_owner}</span></p>
                                    <p>Number of Property Partners: <span className='font-semibold'> {data.property_partners}</span></p>
                                    <p>Property Address: <span className='font-semibold'> {data.property_address}</span></p>
                                    <p>Property Name: <span className='font-semibold'> {data.property_name}</span></p>
                                    <p>Selling Price: <span className='font-semibold'> {data.selling_price}</span></p>
                                    <p>Property Type: <span className='font-semibold'> {data.residential}</span></p>
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
                                    {
                                        data?.social_media &&
                                        <p>Social Medias: {data?.social_media}</p>
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

export default SalesInformation;
