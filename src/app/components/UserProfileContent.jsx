import React from 'react';

const UserProfileContent = ({ select, data }) => {
    return (
        <div className='w-full p-4 bg-white rounded-md h-[calc(100vh-88px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-104px)]'>
            {
                select === 1 && <Profile data={data} />
            }
        </div>
    );
};

export default UserProfileContent;

const Profile = ({ data }) => {
    const { fullname, isVerified, email, photo, phone_no } = data

    return (
        <div className='flex justify-center items-center w-full'>
            <div>
                <h2 className='text-xl mb-5'>Here is the profile data show</h2>
                <div className="bg-white shadow-md rounded-md p-6">
                    {photo ? <img className='w-40 rounded-full mx-auto' src={photo} alt='propic' /> : <img className='w-40 rounded-full mx-auto' src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" alt='pro-pic' />}

                    {fullname ? <h2 className="text-2xl font-semibold   text-blue-600">Name: {fullname}</h2> : <h2 className="text-2xl font-semibold   text-blue-600">Name: </h2>}

                    {email ? <strong>Email: <span className='font-light'>{email}</span></strong> : <strong>Email:</strong>} <br />
                    {phone_no ? <strong>Phone No.: <span className='font-light'>{phone_no}</span></strong> : <strong>Phone No.</strong>}

                    <div className='flex items-start gap-1'>
                        <strong className="">Verified: </strong>
                        {isVerified ? <div className='text-black font-light'>Yes</div> : <div className='text-red-700'>No</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}