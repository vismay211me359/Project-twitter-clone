import { FaXTwitter } from "react-icons/fa6";
import { FaHome, FaSearch, FaRegPlusSquare, FaBell, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import Image from 'next/image';


const MediumSideBar = () => {
  return (
    <div>
      <div className="flex flex-col justify-between items-center h-full fixed">
        <div className="flex flex-col space-y-8 p-4 ">
          <FaXTwitter className="text-3xl hover:text-app-icon-hover transition-colors" size={40}/>
          <FaHome className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
          <FaSearch className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
          <FaRegPlusSquare className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
          <FaBell className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
          <FaEnvelope className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
          <FaUserPlus className="text-2xl hover:text-app-icon-hover transition-colors" size={35}/>
        </div>

        <div className="flex items-center justify-center p-4">
          <div className="rounded-full border-2 border-app-border overflow-hidden w-12 h-12">
            <Image
              src="/images/profile_photo.webp"
              alt="User Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediumSideBar;
