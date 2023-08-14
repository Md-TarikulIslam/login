import React from 'react';
import { styles } from '@/app/styles/styles';

const ProductsCard = ({ data, setData, setOpen }) => {
    const { photo, products_quantity, products_price, company_name, city, state, postal_code, country } = data;

    const handleOpen = () => {
        setOpen(true);
        setData(data);
    };

    return (
        <div className='bg-slate-200 p-2 rounded-md w-full flex flex-col justify-between'>
            <img src={photo} alt="photo" className='h-52 w-full object-cover rounded-md' />
            <div className='mt-4 h-44'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className='text-xl font-semibold'>{country}</p>
                </div>
                <div className='flex gap-3 mb-1.5'>
                    <p>Address:</p>
                    <div>
                        <p>City/Town: {city}, {state}</p>
                        <p>Postal Code: {postal_code}</p>
                    </div>
                </div>
                <div className='mb-1.5'>
                    {
                        company_name && <p>Company Name: {company_name}</p>
                    }
                    <p>Product Pitch: {products_quantity}</p>
                    <p>Price: {products_price}</p>
                </div>
            </div>
            <div className='flex justify-center'>
                <p onClick={handleOpen} className={`${styles.button}`}>See Details</p>
            </div>
        </div>
    );
};

export default ProductsCard;
