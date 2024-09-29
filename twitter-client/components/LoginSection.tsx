import React from 'react'
import { FaXTwitter } from 'react-icons/fa6';
import CustomLoginButton from './CustomLoginButton';
import { useCurrentUser } from '@/hooks/user';

const LoginSection: React.FC = () => {
    let isLoggedIn=false;
    const {user}=useCurrentUser();
    if(user){
        isLoggedIn=true;
    }
    else{
        isLoggedIn=false;
    }
    return (
        <>
            {!isLoggedIn && (
                <div className="w-full bg-app-background flex flex-col items-center justify-center p-6">
                    <div className="bg-app-card-bg p-6 rounded-lg shadow-lg text-app-text-primary w-full max-w-4xl">
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                {/* Icon */}
                                <FaXTwitter className="text-2xl text-app-icon-hover" />
                                <h2 className="text-lg font-bold">Login Required</h2>
                            </div>
                        </div>

                        {/* Section Content */}
                        <p className="mb-4 text-app-text-secondary">
                            Please sign in to continue using the application.
                        </p>

                        {/* Google Login Button */}
                        <CustomLoginButton />
                    </div>
                </div>
            )}
        </>
    )
}

export default LoginSection;
