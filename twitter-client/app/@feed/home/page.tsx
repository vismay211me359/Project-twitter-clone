'use client'

import FeedList from "@/components/FeedList"
import { useGetAllTweets } from "@/hooks/tweet"

const page = () => {

  const {tweets}=useGetAllTweets();
  console.log(tweets);

  return (
    <div>
      <FeedList tweets={tweets}/>
    </div>
  )
}

export default page
