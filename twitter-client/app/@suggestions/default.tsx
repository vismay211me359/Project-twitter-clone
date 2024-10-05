
// /app/recommended-users/default.tsx

import { FC } from 'react';
import Link from 'next/link';

// Define the User Interface
interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImageURL: string;
}

interface RecommendedUsersProps {
  users: User[];
}

const RecommendedUsers: FC<RecommendedUsersProps> = ({ users }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-custom-gold">Recommended Users</h2>
      
      {/* User List */}
      <div className="flex flex-col space-y-4">
        {users.map((user) => (
          <Link key={user.id} href={`/profile/${user.id}`}>
            <a className="flex items-center p-4 bg-gray-900 rounded-lg transition hover:bg-gray-700">
              <img
                src={user.profileImageURL ? user.profileImageURL : '/images/profile_photo.webp'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="text-white">
                <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-400">View Profile</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedUsers;
