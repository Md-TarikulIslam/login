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
    
    return (
        <div className='flex justify-center items-center w-full'>
            <div>
                <h2>Here is the profile data show</h2>
            </div>
        </div>
    )
}