import React from 'react';
import { styles } from '@/app/styles/styles';

const VehiclesCard = ({ data, setOpen, setData }) => {
    const { vehicle_name, vehicle_model, photo, price, vehicle_type, country } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    return (
        <div className='bg-slate-200 p-2 rounded-md w-full flex flex-col justify-between'>
            <img src={photo} alt="photo" className='h-52 w-full object-cover rounded-md' />
            <div className='mt-4 h-36'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className='text-xl font-semibold'>{country}</p>
                </div>
                <div className='mb-1.5'>
                    <p>Vehicle Name: {vehicle_name}</p>
                    <p>Model: {vehicle_model}</p>
                    <p>Vehicle Condition: {vehicle_type}</p>
                    <p>Price: {price}</p>
                </div>
            </div>
            <div className='flex justify-center'>
                <p onClick={handleOpen} className={`${styles.button}`}>See Details</p>
            </div>
        </div>
    );
};

export default VehiclesCard;
