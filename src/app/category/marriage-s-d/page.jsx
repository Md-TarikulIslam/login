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
    const [isOpen, setIsOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        gender: '',
        marital_status: '',
        occupation: '',
        education: '',
        religion: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        // Perform filtering based on selected options
        const filteredData = biodata.filter((item) => {
            return (
                (filterOptions.gender.toLowerCase() === '' || item.gender.toLowerCase() === filterOptions.gender.toLowerCase()) &&
                (filterOptions.education.toLowerCase() === '' ||
                    item.education.toLowerCase() === filterOptions.education.toLowerCase()) &&
                (filterOptions.marital_status.toLowerCase() === '' ||
                    item.marital_status.toLowerCase() === filterOptions.marital_status.toLowerCase()) &&
                (filterOptions.religion.toLowerCase() === '' ||
                    item.religion.toLowerCase() === filterOptions.religion.toLowerCase()) &&
                (filterOptions.occupation.toLowerCase() === '' ||
                    item.occupation.toLowerCase() === filterOptions.occupation.toLowerCase()) &&
                (filterOptions.country.toLowerCase() === '' ||
                    item.country.toLowerCase() === filterOptions.country.toLowerCase())
            );
        });

        setBiodata(filteredData);
        console.log(filteredData)
    };
    const closeModal = () => {
        setIsOpen(false);
    };

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
    const openModal = () => {
        setIsOpen(true);
    };

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
                                                            <label>Gender:</label>

                                                            <select name="gender" value={filterOptions.gender} onChange={handleChange} className='border px-4 border-solid border-blue-500 rounded w-32' >
                                                                <option value="">All</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className='flex justify-between my-5'>
                                                            <label>Education:</label>
                                                            <select name="education" value={filterOptions.education} onChange={handleChange} className='border px-4 border-solid border-blue-500 rounded w-32'>
                                                                <option value="">All</option>
                                                                <option value="ssc">ssc</option>
                                                                <option value="hsc">hsc</option>
                                                                <option value="hons">hons</option>

                                                            </select>
                                                        </div>
                                                        <div className='flex justify-between '>
                                                            <label>Marital Status:</label>
                                                            <select
                                                                name="marital_status"
                                                                value={filterOptions.marital_status}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-32'
                                                            >
                                                                <option value="">All</option>
                                                                <option value="Single">Single</option>
                                                                <option value="Married">Married</option>
                                                                <option value="Divorced">Divorced</option>
                                                                <option value="Widowed">Widowed</option>
                                                            </select>
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Religion:</label>
                                                            <select
                                                                name="religion"
                                                                value={filterOptions.religion}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-32'
                                                            >
                                                                <option value="">All</option>
                                                                <option value="Islam">Islam</option>
                                                                <option value="Hindu">Hindu</option>

                                                            </select>
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Occupation:</label>
                                                            <input
                                                                type="text"
                                                                name="occupation"
                                                                value={filterOptions.occupation}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-32'
                                                            />
                                                        </div>
                                                        <div className='flex justify-between mt-5'>
                                                            <label>Country:</label>
                                                            <input
                                                                type="text"
                                                                name="country"
                                                                value={filterOptions.country}
                                                                onChange={handleChange}
                                                                className='border px-4 border-solid border-blue-500 rounded w-32'
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

                                                    <div>
                                                        {/* Display the filtered data here */}
                                                        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
