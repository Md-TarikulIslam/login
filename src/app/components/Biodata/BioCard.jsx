import React, { useState } from 'react';
import { styles } from '@/app/styles/styles';

const BioCard = ({ data, setOpen, setData }) => {
    const { full_name, date_of_birth, education, marital_status, occupation, religion, height, weight, photo } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    }

    return (
        <div className='bg-slate-200 p-2 rounded-md w-full flex flex-col justify-between'>
            <img src={photo} alt="photo" className='h-72 w-full object-cover rounded-md' />
            <div className='mt-4 h-36'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className='text-xl font-semibold'>{full_name}</p>
                    <p className='font-mono text-lg'>{marital_status}</p>
                </div>
                <div className='flex justify-between items-center mb-0.5'>
                    <p>{date_of_birth.slice(0, 10)}</p>
                    <p>{religion}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='mb-0.5'>
                        <p>{education}</p>
                        <p>{occupation}</p>
                    </div>
                    <div>
                        <p>{height} cm</p>
                        <p>{weight} kg</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <p onClick={handleOpen} className={`${styles.button}`}>See Details</p>
            </div>
        </div>
    );
};

export default BioCard;