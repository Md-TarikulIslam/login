'use client'

import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import axios from 'axios';
import RentCard from './RentCard';
import Link from 'next/link';
import { RxCross1 } from 'react-icons/rx';

const FeaturedRent = () => {
    const [rent, setRent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

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

    const temp = rent.reverse().slice(0, 4);

    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>H.O.S Rent</h2>
                    <Link href='/category/h-o-s-rent' shallow>see more</Link>
                </div>
                {
                    !open &&
                    <>
                        {
                            loading ?
                                <div className='flex justify-center mt-52'> <Loader /> </div>
                                :
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                    {
                                        temp.map((data, index) =>
                                            <RentCard
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
                                        <p>Area: <span className='font-semibold'>{data.area}</span></p>
                                        <p><span className='font-semibold'>Address:</span></p>
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
        </div>
    );
};

export default FeaturedRent;
