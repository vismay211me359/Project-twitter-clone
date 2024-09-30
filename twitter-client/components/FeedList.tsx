import FeedCard from "./FeedCard";
import PostContainer from "./PostContainer";

import React from 'react'

interface User {
    firstName: string;
    lastName?: string | null;
    profileImageURL?: string | null;
    id:string
  }
  
  interface tweetInterface {
    content: string;
    id: string;
    imageURL?: string | null;
    tags?: string[];
    author?: User | null;
  }
  
  interface TweetProps {
    tweets?: (tweetInterface | null)[] | null; // Allows undefined, null, or an array of tweetInterface or null
  }

const FeedList: React.FC<TweetProps> = ({ tweets }) => {
    return (
        <div className="w-full border-x-2 border-app-border">
            <PostContainer />
            {tweets && tweets.map((tweet) => (
                <div key={tweet?.id}>
                    <FeedCard id={tweet?.author?.id} authorName={tweet?.author?.firstName || "ananymous"} authorHandle={tweet?.author?.firstName || "ananymous"} tweetTime="15h" tweetContent={tweet?.content || ""} media={tweet?.imageURL || undefined} tweetTags={tweet?.tags} likesCount={100} commentCount={200} retweetCount={500} trendingCount={50} profileImageURL={tweet?.author?.profileImageURL || undefined}/>
                </div>
            ))}
        </div>
    )
}

export default FeedList



