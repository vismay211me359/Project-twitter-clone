import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import CustomLoginButton from './CustomLoginButton';

interface LoginModalProps {
    isLoggedIn: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isLoggedIn }) => {
    const [showModal, setShowModal] = useState(false);

    // Automatically show modal every 1 minute if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            const interval = setInterval(() => {
                setShowModal(true);
            }, 60000); // 1 minute interval

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [isLoggedIn]);

    // Function to close the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-app-shadow z-50">
                    <div className="bg-app-card-bg p-6 rounded-lg shadow-lg text-app-text-primary max-w-md w-full">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                {/* Icon */}
                                <FaXTwitter className="text-2xl text-app-icon-hover" />
                                <h2 className="text-lg font-bold">Login Required</h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="text-app-text-primary hover:text-app-icon-hover transition-all"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Content */}
                        <p className="mb-4 text-app-text-secondary">
                            Please sign in to continue using the application.
                        </p>

                        {/* Google Login Button */}
                        <CustomLoginButton />
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;
