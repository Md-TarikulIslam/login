import React from 'react';
import { styles } from '@/app/styles/styles';

const SalesCard = ({ data, setOpen, setData }) => {
    const { property_address, property_name, photo, selling_price, property_type, residential, city, postal_code, country } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    return (
        <div className='bg-slate-200 p-2 rounded-md w-full flex flex-col justify-between'>
            <img src={photo} alt="photo" className='h-52 w-full object-cover rounded-md' />
            <div className='mt-4 h-52'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className='text-xl font-semibold'>{country}</p>
                </div>
                <div className='flex gap-3 mb-1.5'>
                    <p>Address:</p>
                    <div>
                        <p>Street: {property_address}</p>
                        <p>City/Town: {city}</p>
                        <p>Postal Code: {postal_code}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='mb-0.5'>
                        <p>Property Name: {property_name}</p>
                        <p>Property Type: {property_type}</p>
                    </div>
                    <div>
                        <p>Residential: {residential}</p>
                        <p>Selling Price: {selling_price} $</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <p onClick={handleOpen} className={`${styles.button}`}>See Details</p>
            </div>
        </div>
    );
};

export default SalesCard;
