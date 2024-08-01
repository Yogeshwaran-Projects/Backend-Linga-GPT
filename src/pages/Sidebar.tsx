import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

interface SidebarProps {
  userName: string | null;
}

const Sidebar = ({ userName }: SidebarProps) => {
  const navigation = [
    { name: 'Home', href: '/', icon: <i className="fa fa-home"></i> },
    { name: 'Profile', href: '/profile', icon: <i className="fa fa-user"></i> },
    // Add more navigation items as needed
  ];

  return (
    <div className="flex flex-col w-64 h-screen py-8 bg-gray-800 border-r dark:bg-gray-900 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-white">
        LINGA AI
      </h2>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=200"
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-white">{userName || 'User Name'}</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-400">
          Linga-AI@yogesh.com
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200"
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
