'use client';

import { IoMdArrowRoundBack } from "react-icons/io";
import Image from 'next/image';
import { useGetUserById } from '@/hooks/user';
import FeedCard from '@/components/FeedCard';
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { id: string } }) => {

  const router=useRouter();

  const { user } = useGetUserById(params.id);

  const handleBack = () => {
    router.back();
  };

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
              className="bg-app-text-primary hover:bg-app-text-secondary text-black font-bold py-2 px-4 rounded mx-2 transition-all duration-300"
            >
              Follow
            </button>
          </div>
        </div>
        <div className='flex gap-4 mt-2 text-sm text-app-text-secondary'>
          <span>{user?.followers.length} followers</span>
          <span>{user?.following.length} following</span>
        </div>
      </div>
      <div>
        {user?.tweets && <div><div className="w-full border-x-2 border-app-border">
          {user.tweets.map((tweet) => (
            <div key={tweet?.id}>
              <FeedCard id={tweet?.id} authorName={user.firstName} authorHandle={user.firstName || "ananymous"} tweetTime="15h" tweetContent={tweet?.content || ""} media={tweet?.imageURL || undefined} tweetTags={tweet?.tags} likesCount={100} commentCount={200} retweetCount={500} trendingCount={50} profileImageURL={user.profileImageURL || undefined} />
            </div>
          ))}
        </div></div>}
      </div>
    </div>
  )
}

export default page
