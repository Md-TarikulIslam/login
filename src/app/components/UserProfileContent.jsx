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
    const { fullname, isVerified, email } = data

    return (
        <div className='flex justify-center items-center w-full'>
            <div>
                <h2 className='text-xl mb-5'>Here is the profile data show</h2>
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-2xl font-semibold text-center text-blue-600">{fullname}</h2>
                    <div className="">
                        <p className="text-center">
                            <strong>Email:</strong> {email}
                        </p>
                    </div>
                    <div className='flex items-start gap-1 justify-center'>
                        <strong className="">Verified: </strong>
                        {isVerified ? <div className='text-black'>Yes</div> : <div className='text-red-700'>No</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}