import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  QueueListIcon,
  UserCircleIcon,
  GlobeAltIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Navigation items
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: QueueListIcon },
  { name: 'Profiles', href: '/profiles', icon: UserCircleIcon },
  { name: 'Proxies', href: '/proxies', icon: GlobeAltIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-dark-panel border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        <img 
          src="/sneakerbot-logo.svg" 
          alt="SneakerBot Logo" 
          className="h-8 w-8 mr-2" 
        />
        <span className="text-xl font-semibold text-wsb-text">SneakerBot</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => 
              `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive 
                  ? 'bg-wsb-primary bg-opacity-10 text-wsb-primary' 
                  : 'text-wsb-text hover:bg-gray-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-wsb-primary' : 'text-wsb-text-secondary'
                  }`} 
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Version info */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-xs text-wsb-text-secondary">
            Version 0.9.0
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-100">
            Beta
          </span>
        </div>
      </div>
    </div>
  );
}
