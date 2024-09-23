import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "X Clone - A Next.js Twitter-Like Social Media Platform",
  description: "X Clone is a modern social media web app built with Next.js, offering real-time feed updates, user interactions, and a responsive design inspired by Twitter. Users can post, comment, like, retweet, and engage with a familiar interface optimized for performance and scalability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
