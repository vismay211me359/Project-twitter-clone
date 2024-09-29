'use client'
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import SmallSideBar from "@/components/SmallSideBar";
import MediumSideBar from "@/components/MediumSideBar";
import LargeSideBar from "@/components/LargeSideBar";
import FeedList from "@/components/FeedList";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SmallTopBar from "@/components/SmallTopBar";
import LoginModal from "@/components/LoginModal";
import LoginSection from "@/components/LoginSection";
import { Toaster } from "react-hot-toast";
import {QueryClientProvider,QueryClient} from "@tanstack/react-query"
import  {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient=new QueryClient();


export default function RootLayout({ feed, suggestions }: { feed: React.ReactNode, suggestions: React.ReactNode }) {

  const clientId = process.env.GOOGLE_ID as string;

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
      <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <body>
          <main>
            <Toaster/>
            <LoginModal isLoggedIn={true}/>
            {viewPort === "mini" && <div>
              <SmallTopBar/>
              <div>{feed}</div>
              <FeedList />
              <SmallSideBar />
            </div>}
            {viewPort === "small" && <div className="grid grid-cols-[1fr_7fr] min-h-screen">
              <div><MediumSideBar /></div>
              <div className="relative"><div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-app-background text-app-text-primary p-4 rounded-lg shadow-lg"><LoginSection/></div><FeedList /></div></div>}
            {viewPort === "medium" && <div className="grid grid-cols-[1fr_5fr_4fr] min-h-screen">
              <div><MediumSideBar /></div>
              <div><FeedList /></div>
              <div className="relative"><div className="fixed"><LoginSection/></div></div>
            </div>}
            {viewPort === "large" && <div className="grid grid-cols-[3fr_4fr_3fr] min-h-screen">
              <div className="justify-self-center"><LargeSideBar /></div>
              <div><FeedList /></div>
              <div className="relative"><div className="fixed"><LoginSection/></div></div>
            </div>}
          </main>
          <ReactQueryDevtools/>
        </body>
      </GoogleOAuthProvider>
      </QueryClientProvider>
    </html>
  );
}
