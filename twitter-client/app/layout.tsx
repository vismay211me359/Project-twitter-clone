'use client'
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import SmallSideBar from "@/components/SmallSideBar";
import MediumSideBar from "@/components/MediumSideBar";
import LargeSideBar from "@/components/LargeSideBar";
import FeedList from "@/components/FeedList";


export default function RootLayout({ feed, suggestions }: { feed: React.ReactNode, suggestions: React.ReactNode }) {

  const [viewPort, setViewPort] = useState("large");

  const handleResize = () => {
    let viewPortValue = window.innerWidth;
    if (viewPortValue < 660) {
      setViewPort("mini");
    }
    else if (viewPortValue < 1000) {
      setViewPort("small");
    }
    else if (viewPortValue < 1280) {
      setViewPort("medium");
    }
    else {
      setViewPort("large");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <html lang="en">
      <body>
        <main>
          {viewPort === "mini" && <div>
            <div>{feed}</div>
            <FeedList/>
            <SmallSideBar />
          </div>}
          {viewPort === "small" && <div className="grid grid-cols-[1fr_7fr] min-h-screen">
            <div><MediumSideBar /></div>
            <div><FeedList/></div></div>}
          {viewPort==="medium"  && <div className="grid grid-cols-[1fr_5fr_4fr] min-h-screen">
              <div><MediumSideBar/></div>
              <div><FeedList/></div>
              <div>lawda</div>
            </div>}
            {viewPort==="large"  && <div className="grid grid-cols-[3fr_4fr_3fr] min-h-screen">
              <div className="justify-self-center"><LargeSideBar/></div>
              <div><FeedList/></div>
              <div>lawda</div>
              </div>}
        </main>
      </body>
    </html>
  );
}
