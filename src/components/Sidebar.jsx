import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/transactions', label: 'Transactions', icon: '💳' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="bg-slate-950 border-r border-slate-800 w-64 min-h-screen p-6 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-md font-semibold transition-all text-base flex items-center gap-3 ${
              location.pathname === item.path
                ? 'bg-teal-600/90 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-900 hover:text-teal-400'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
