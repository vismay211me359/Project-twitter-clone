import { FaXTwitter } from "react-icons/fa6";
import { FaHome, FaBell, FaEnvelope, FaBookmark, FaUser, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
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
  return (
    <div className="pr-20 ">
      <div className="bg-app-background flex flex-col justify-between items-center h-full fixed">
        <div className="flex flex-col space-y-8 p-4">
          <div className="pl-3"><FaXTwitter size={32} /></div>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="bg-app-background flex items-center text-app-text-primary text-xl py-2 px-4 rounded-full hover:bg-app-border transition-all duration-300 mb-2"
            >
              <span className="mr-4">{item.icon}</span>
              {item.name}
            </a>
          ))}
          <button className="mt-8 bg-app-primary-btn hover:bg-app-btn-hover text-app-text-primary font-bold py-3 px-8 rounded-full w-full transition-all duration-300">
            Post
          </button>
        </div>
        <div className="flex items-center justify-center p-4 bg-app-background hover:bg-app-border rounded-full cursor-pointer transition-all duration-300">
          <Image
            src="/images/profile_photo.webp"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-app-text-primary ml-4">
            <p className="font-bold">John Doe</p>
            <p className="text-app-text-secondary">@johndoe</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LargeSideBar;
