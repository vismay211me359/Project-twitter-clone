import React, { useCallback } from 'react'
import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from '@tanstack/react-query';

const CustomLoginButton = () => {

    const queryClinet=useQueryClient();

    const handleLoginWithGoogle = useCallback(async(cred:CredentialResponse)=>{
            const googleToken = cred.credential;
            if (!googleToken) {
                return toast.error("Google login failed")
            }
            const {verifyGoogleToken}=await graphqlClient.request(verifyUserGoogleTokenQuery,{token:googleToken});
            toast.success("verified sucess");
            
            if(verifyGoogleToken){
                window.localStorage.setItem("twitterclonetoken",verifyGoogleToken);
            }
            await queryClinet.invalidateQueries({ queryKey: ['current-user'] });
    },[queryClinet]);

    return (
        <>
            <button
                className="bg-app-primary-btn text-white py-2 px-4 rounded-lg hover:bg-app-btn-hover transition-all duration-300"
            >
                <GoogleLogin onSuccess={handleLoginWithGoogle} onError={() => toast.error("Google login failed")}/>
            </button>
        </>
    )
}

export default CustomLoginButton;
