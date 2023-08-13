import React from 'react';
import { styles } from '@/app/styles/styles';

const RentCard = ({ data, setOpen, setData }) => {
    const { photo, country, street, city, state, postal_code, area, land_type, advance_pay, monthly_rent, room, bathroom, kitchen, balcony } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    return (
        <div className='bg-slate-200 p-2 rounded-md w-full flex flex-col justify-between'>
            <img src={photo} alt="photo" className='h-52 w-full object-cover rounded-md' />
            <div className='mt-4 h-56'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className='text-xl font-semibold'>{country}</p>
                </div>
                <div className='flex gap-3 mb-1.5'>
                    <p>Address:</p>
                    <div>
                        <p>Street: {street}</p>
                        <p>City/Town: {city}</p>
                        <p>Postal Code: {postal_code}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='mb-0.5'>
                        <p>Total Area: {area} sq. ft.</p>
                        <p>Land Type: {land_type}</p>
                        <p>Advance Pay: {advance_pay}</p>
                        <p>Monthly Rent: {monthly_rent}</p>
                    </div>
                    <div>
                        <p>Room: {room}</p>
                        <p>Bathroom: {bathroom}</p>
                        <p>Kitchen: {kitchen}</p>
                        <p>Balcony: {balcony}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <p onClick={handleOpen} className={`${styles.button}`}>See Details</p>
            </div>
        </div>
    );
};

export default RentCard;
