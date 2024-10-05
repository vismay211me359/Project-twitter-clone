// /app/parallel/default.tsx

import { ReactNode } from 'react';

type ParallelLayoutProps = {
  dashboard: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({ dashboard, profile }: ParallelLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dashboard Section */}
      <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {dashboard}
      </div>

      {/* Profile Section */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {profile}
      </div>
    </div>
  );
}
