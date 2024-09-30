import { FaXTwitter } from "react-icons/fa6";
import { FaHome, FaBell, FaEnvelope, FaBookmark, FaUser, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { useCurrentUser } from "@/hooks/user";
import { useState } from 'react';
import Link from "next/link";
interface MenuItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: 'Home', icon: <FaHome />, href: '/' },
  { name: 'Explore', icon: <FaSearch />, href: '/explore' },
  { name: 'Notifications', icon: <FaBell />, href: '/notifications' },
  { name: 'Messages', icon: <FaEnvelope />, href: '/messages' },
  { name: 'Bookmarks', icon: <FaBookmark />, href: '/bookmarks' },
  { name: 'Profile', icon: <FaUser />, href: '/profile' },
];


const LargeSideBar: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleLogout = () => {

  }
  const { user } = useCurrentUser();
  return (
    <div className="pr-20 ">
      <div className="bg-app-background flex flex-col justify-between items-center h-full fixed">
        <div className="flex flex-col space-y-8 p-4">
          <div className="pl-3"><FaXTwitter size={32} /></div>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-app-background flex items-center text-app-text-primary text-xl py-2 px-4 rounded-full hover:bg-app-border transition-all duration-300 mb-2"
            >
              <span className="mr-4">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          <button className="mt-8 bg-app-primary-btn hover:bg-app-btn-hover text-app-text-primary font-bold py-3 px-8 rounded-full w-full transition-all duration-300">
            Post
          </button>
        </div>
        <div className="flex items-center justify-center p-4 bg-app-background hover:bg-app-border rounded-full cursor-pointer transition-all duration-300">
          <Image
            src={(user && user.profileImageURL) ? user.profileImageURL : "/images/profile_photo.webp"}
            alt="Profile"
            width={32}
            height={32}
            className="w-full h-full rounded-full"
          />
          <div className="relative">
            {/* The clickable button displaying the user's name */}
            <div
              className="text-app-text-primary ml-4 cursor-pointer"
              onClick={toggleDropdown}
            >
              <p className="font-bold">{user?.firstName || "John Doe"}</p>
              <p className="text-app-text-secondary">@{user?.firstName || "JohnDoe"}</p>
            </div>

            {/* The dropdown will appear above the button when clicked */}
            {isDropdownVisible && (
              <div
                className="absolute -top-16 right-0 w-48 bg-app-card-bg text-app-text-primary rounded-lg shadow-lg p-4 z-50"
                onClick={() => setDropdownVisible(false)}
              >
                <button
                  className="w-full text-left hover:bg-app-btn-hover hover:text-white py-2 px-3 rounded-lg transition-colors duration-300"
                  onClick={handleLogout}
                >
                  Wanna Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LargeSideBar;
