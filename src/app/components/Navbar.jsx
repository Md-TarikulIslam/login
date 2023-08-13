'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';
import { categories } from '@/static/data'
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

const Navbar = () => {
    const [data, setData] = useState("")

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        setData(res.data.data._id)
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="bg-blue-700 rounded-md my-1">
            <div className="p-4 flex justify-between items-center">
                <div>
                    <Link href="/" shallow>
                        <span className="cursor-pointer font-bold text-xl md:text-2xl lg:text-3xl text-white">Company Name</span>
                    </Link>
                </div>
                <div className="hidden md:flex gap-6">
                    {
                        categories.map((category, index) => (
                            <Link
                                shallow
                                key={index}
                                href={`/category/${category.slug}`}
                                className='flex flex-col items-center text-white gap-1'
                            >
                                <span>{category.icon}</span>
                                <span className="text-white md:font-medium text-center lg:font-semibold text-sm lg:text-base cursor-pointer">{category.name}</span>
                            </Link>
                        ))
                    }
                </div>

                <div>
                    {
                        data && <div className='flex gap-3 items-center'>
                            <Link
                                href='/create'
                                className={`flex gap-1 items-center btn border-[1px] border-white py-1 px-2 rounded text-white font-medium`}>
                                <RiAddCircleLine color='white' size={20} />
                                <span className='text-lg text-white'>Post</span>
                            </Link>
                            <Link href="/profile" shallow>
                                {
                                    <CgProfile className='w-7 md:w-8 lg:w-9 h-7 md:h-8 lg:h-9' color='white' />
                                    // <img className='w-7 md:w-8 lg:w-9 h-7 md:h-8 lg:h-9 rounded-full object-cover' src={`${session?.user?.image}`} alt="profile" />
                                }
                            </Link>
                        </div>
                    }
                    {
                        !data && <Link href="/login" shallow>
                            <span className='btn border-[1px] border-white py-1 px-3 rounded text-white font-medium'>Login</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
