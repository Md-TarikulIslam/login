'use client'

import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { TfiWrite } from 'react-icons/tfi';
import { TbListDetails } from 'react-icons/tb';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { GoSignOut } from 'react-icons/go';
import axios from 'axios';

const ProfileSideBar = ({ select, setSelect }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await axios.get('api/users/logout')
            toast.success("Logout successful")
            router.push('/')
        }
        catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className='bg-white p-4 rounded-md w-full flex flex-col gap-8 h-[calc(100vh-88px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-104px)]'>
            <div onClick={() => setSelect(1)} className={`flex gap-2 items-center cursor-pointer ${select === 1 ? 'text-blue-700' : 'text-gray-700'}`}>
                <p><CgProfile size={23} /></p>
                <span className='text-lg hidden md:block font-medium'>Profile</span>
            </div>
            {/* <div onClick={() => setSelect(2)} className={`flex gap-2 items-center cursor-pointer ${select === 2 ? 'text-blue-700' : 'text-gray-700'}`}>
                <p><TbListDetails size={23} /></p>
                <span className='text-lg hidden md:block font-medium'>Bio Data</span>
            </div>
            <div onClick={() => setSelect(3)} className={`flex gap-2 items-center cursor-pointer ${select === 3 ? 'text-blue-700' : 'text-gray-700'}`}>
                <p><TfiWrite size={23} /></p>
                <span className='text-lg hidden md:block font-medium'>Posts</span>
            </div> */}
            <div onClick={handleSignOut} className={`flex gap-2 items-center cursor-pointer ${select === 4 ? 'text-blue-700' : 'text-gray-700'}`}>
                <p><GoSignOut size={23} /></p>
                <span className='text-lg hidden md:block font-medium'>SignOut</span>
            </div>
        </div>
    );
};

export default ProfileSideBar;