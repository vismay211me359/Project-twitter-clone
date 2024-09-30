import { FaComment, FaRetweet, FaHeart, FaBookmark, FaEllipsisH, FaUpload } from 'react-icons/fa';
import { IoIosTrendingUp } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';

interface TweetCardProps {
  id:string | undefined,
  authorName: string;
  authorHandle: string;
  tweetTime: string;
  tweetContent: string;
  media?: string;
  tweetTags?: (string | null)[] | null | undefined;
  likesCount: number;
  commentCount: number;
  retweetCount: number;
  trendingCount: number;
  profileImageURL?:string;
}

const FeedCard: React.FC<TweetCardProps> = ({
  id,
  authorName,
  authorHandle,
  tweetTime,
  tweetContent,
  media,
  tweetTags = [],
  likesCount,
  commentCount,
  retweetCount,
  trendingCount,
  profileImageURL
}) => {
  return (
    <div className="w-full bg-app-background text-app-text-primary border-app-border border-b-2 pb-2">
      <div className="grid grid-cols-[1fr_11fr]">
        <Link href={`/profile/${id}`}>
        <div className='m-2'>
          <Image
            src={profileImageURL || "/images/profile_photo.webp"}
            alt={authorName}
            width={30}
            height={30}
            className="w-full h-auto rounded-full object-cover"
          />
        </div>
        </Link>
        <div>
          <div className='mt-2 flex justify-between'>
            <div className="flex items-center space-x-2">
              <Link href={`/profile/${id}`}>
              <span className="text-app-text-primary font-bold">{authorName}</span>
              </Link>
              <Link href={`/profile/${id}`}>
              <span className="text-app-text-secondary">@{authorHandle}</span>
              </Link>
              <span className="text-app-text-secondary">&middot; {tweetTime}</span>
            </div>

            <div className="text-app-text-secondary hover:text-app-text-primary cursor-pointer mx-3">
              <FaEllipsisH />
            </div>
          </div>
          <div className='text-app-text-primary mt-2 mr-3'>
            {tweetContent}
          </div>
          {tweetTags &&tweetTags.length > 0 && <div className="mt-1 text-app-hashtag">
            {tweetTags.map((tag, index) => (
              <span key={index} className="mr-2">
                #{tag}
              </span>
            ))}
          </div>}
          {media && (<div className='mt-3 mr-3'>
            <Image
              src="/production/tweet_demo_photo.jpeg"
              alt={authorName}
              width={40}
              height={40}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>)}
          <div className='flex justify-between mt-2 text-app-text-primary mr-3'>
            <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer">
              <FaComment />
              <span>{commentCount}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer">
              <FaRetweet />
              <span>{retweetCount}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer">
              <FaHeart />
              <span>{likesCount}</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer">
              <IoIosTrendingUp />
              <span>{trendingCount}</span>
            </div>
            <div className='flex align-middle'>
              <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer mr-2">
                <FaBookmark />
              </div>
              <div className="flex items-center space-x-2 hover:text-app-icon-hover cursor-pointer">
                <FaUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCard
