import FeedCard from "./FeedCard";

import React from 'react'

const FeedList: React.FC = () => {
    return (
        <div className="w-full border-x-2 border-app-border">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                    <FeedCard authorName="vismay" authorHandle="imvismay" tweetTime="15h" tweetContent="Just finished building an awesome project using #ReactJS and #TailwindCSS! 🚀 #webdevelopment.
              Our new product is finally here! Visit our website to learn more: https://example.com 🛒 #ecommerce #newrelease" media="*/production/tweet_demo_photo.jpeg" tweetTags={["vismau", "lawda", "testing"]} likesCount={100} commentCount={200} retweetCount={500} trendingCount={50} />
                </div>
            ))}
        </div>
    )
}

export default FeedList



