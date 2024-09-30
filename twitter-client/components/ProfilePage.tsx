'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/user';
import PostContainer from './PostContainer';
import FeedCard from './FeedCard';

const ProfilePage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const { user } = useCurrentUser();

  return (
    <div className='w-full min-h-screen h-auto border-x-2 border-app-border'>
      <div className='flex gap-2 '>
        <div>
          <button
            onClick={handleBack}
            className=" text-white font-bold p-2 rounded-full hover:bg-app-border transition-all duration-300"
          >
            <IoMdArrowRoundBack size={30} />
          </button>
        </div>
        <div className='flex flex-col'>
          <div className='font-bold text-xl'>
            {user?.firstName}
          </div>
          <div className='text-sm font-mono text-app-text-secondary'>
            1500 posts
          </div>
        </div>
      </div>
      <div className='border-b-2 border-app-border pb-3'>
        <div className='mt-5 flex justify-between mx-3'>
          <div>
            <Image src={user?.profileImageURL ? user.profileImageURL : "/images/profile_photo.webp"} alt='profile_phot' width={60} height={60} className='rounded-full' />
            <div className='font-bold text-xl mt-2'>
              {user?.firstName}
            </div>
          </div>
          <div>
            <button
              className="bg-app-primary-btn hover:bg-app-btn-hover text-white font-bold py-2 px-4 rounded mx-2 transition-all duration-300"
            >
              Edit Profile
            </button>
            <button
              className="bg-app-text-primary hover:bg-app-text-secondary text-black font-bold py-2 px-4 rounded mx-2 transition-all duration-300"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
      <div>
        <PostContainer />
        {user?.tweets ? <div><div className="w-full border-x-2 border-app-border">
            {user.tweets.map((tweet) => (
                <div key={tweet?.id}>
                    <FeedCard id={tweet?.id} authorName={user.firstName} authorHandle={user.firstName || "ananymous"} tweetTime="15h" tweetContent={tweet?.content || ""} media={tweet?.imageURL || undefined} tweetTags={tweet?.tags} likesCount={100} commentCount={200} retweetCount={500} trendingCount={50} profileImageURL={user.profileImageURL || undefined}/>
                </div>
            ))}
        </div></div> : (<div>
          <div className="flex items-center justify-center bg-app-background m-5">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">No Tweets</h2>
              <p className="text-lg">Make Tweets!</p>
              <p className="mt-2 text-gray-400">
                Share your thoughts with the world.
              </p>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default ProfilePage
