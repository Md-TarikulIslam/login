'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Loader from '@/app/components/Loader';
import BioCard from '@/app/components/Biodata/BioCard';
import { RxCross1 } from 'react-icons/rx';

const MarriageBiodata = () => {
    const [biodata, setBiodata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api/biodata/getbiodata')
            .then((response) => {
                setBiodata(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching biodata:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='container mx-auto min-h-screen pb-4'>
            <Navbar />
            <h2 className='text-2xl font-semibold mt-4 mb-3 text-center'>All Biodata for Marriage</h2>
            {
                !open &&
                <>
                    {
                        loading ?
                            <div className='flex justify-center mt-52 h-screen'> <Loader /> </div>
                            :
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {
                                    biodata.map((data, index) =>
                                        <BioCard
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
                            <div>
                                <img className='w-60 h-60 object-cover rounded-md' src={data.photo} alt="photo" />
                            </div>
                            <div className='flex gap-4 w-full justify-center flex-col lg:flex-row'>
                                <div className='flex-1 border-[1px] border-slate-300 p-4 rounded-md'>
                                    <p>Full Name: <span className='font-semibold'>{data.full_name}</span></p>
                                    <p>Date of Birth: <span className='font-semibold'>{data.date_of_birth.slice(0, 10)}</span></p>
                                    <p>Blood Group: <span className='font-semibold'> {data.blood_group}</span></p>
                                    <p>Gender: <span className='font-semibold'> {data.gender}</span></p>
                                    <p>Marital Status: <span className='font-semibold'> {data.marital_status}</span></p>
                                    <p>Education: <span className='font-semibold'> {data.education}</span></p>
                                    <p>Occupation: <span className='font-semibold'> {data.occupation}</span></p>
                                    <p>Religion: <span className='font-semibold'> {data.religion}</span></p>
                                    <div className='flex justify-between'>
                                        <p>Height: <span className='font-semibold'> {data.height} cm</span></p>
                                        <p>Weight: <span className='font-semibold'> {data.weight} kg</span></p>
                                    </div>
                                </div>
                                <div className='flex-1 border-[1px] border-slate-300 p-4 rounded-md'>
                                    <p>Father's Name: <span className='font-semibold'> {data.father_name}</span></p>
                                    <p>Father's Occupation: <span className='font-semibold'> {data.father_occupation}</span></p>
                                    <p>Mother's Name: <span className='font-semibold'> {data.mother_name}</span></p>
                                    <p>Mother's Occupation: <span className='font-semibold'> {data.mother_occupation}</span></p>
                                    <p>Number of Brothers: <span className='font-semibold'> {data.brothers}</span></p>
                                    <p>Number of Sisters: <span className='font-semibold'> {data.sisters}</span></p>
                                    <p>Guardian: <span className='font-semibold'> {data.guardian}</span></p>
                                    <p>Address: <span className='font-semibold'> {data.street}, {data.city}, {data.postal_code}</span></p>
                                    <p>Country: <span className='font-semibold'> {data.state}, {data.country}</span></p>
                                </div>
                            </div>
                            <div className='border-[1px] border-slate-300 p-4 rounded-md w-full'>
                                <p className='font-semibold'>Contact Information:</p>
                                <div>
                                    <p>Email: {data.email}</p>
                                    <p>Phone: {data.phone}</p>
                                    <p>Social Links: {data?.social_media}</p>
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

export default MarriageBiodata;
