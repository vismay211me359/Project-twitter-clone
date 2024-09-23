'use client'

import { useEffect, useState } from 'react';
import { FaHome, FaHashtag, FaSearch, FaBell, FaEnvelope, FaUser, FaPlus } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";


interface MobileMenuItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

const mobileMenuItems: MobileMenuItem[] = [
  { name: 'Home', icon: <FaHome />, href: '/' },
  { name: 'Explore', icon: <FaHashtag />, href: '/explore' },
  { name: 'Search', icon: <FaSearch />, href: '/search' },
  { name: 'Post', icon: <FaPlusCircle />, href: '/post' },
  { name: 'Notifications', icon: <FaBell />, href: '/notifications' },
  { name: 'Messages', icon: <FaEnvelope />, href: '/messages' },
  { name: 'Profile', icon: <FaUser />, href: '/profile' },
];

const SmallSideBar: React.FC = () => {

  const [active, setActive] = useState<string>('Home');
  const [visible, setVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-app-background border-t border-app-border p-3 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <ul className="flex justify-around items-center">
        {/* First set of icons */}
        <div className='flex gap-6'>
        {mobileMenuItems.map((item) => (
          <li key={item.name} className="flex-1 text-center">
            <a
              href={item.href}
              onClick={() => setActive(item.name)}
              className={`text-2xl ${active === item.name ? 'text-app-primary-btn' : 'text-app-icon-default'} hover:text-app-icon-hover transition-colors`}
            >
              {item.icon}
            </a>
          </li>
        ))}</div>

      </ul>
    </nav>

  )
}

export default SmallSideBar;
