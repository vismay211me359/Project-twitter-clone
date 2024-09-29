import React from 'react'
import { useState, useEffect } from 'react';
import { FaXTwitter } from "react-icons/fa6";
import CustomLoginButton from './CustomLoginButton';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image';

const SmallTopBar = () => {

    const { user } = useCurrentUser();

    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setIsVisible(currentScrollPos === 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`${isVisible ? 'top-0' : '-top-20'
                } fixed left-0 right-0 z-50 bg-app-background transition-all duration-300 ease-in-out h-12 flex items-center justify-center shadow-lg`}
        >
            {/* Profile Image */}
            {user && user.profileImageURL &&  (
                <div className="absolute left-4 h-10 w-10 rounded-full overflow-hidden">
                    <Image
                        src={user?.profileImageURL} // Add a valid image URL
                        alt="Profile"
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            {/* X Icon in the Middle */}
            <div className="flex justify-center items-center">
                <FaXTwitter className="text-2xl hover:text-app-icon-hover transition-colors duration-300" size={40} />
            </div>

            {/* Login Button - Visible only when the user is null */}
            {!user && (
                <div className='m-2 absolute right-4'>
                    <CustomLoginButton />
                </div>
            )}
        </div>
    )
}

export default SmallTopBar
