import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { logout } from '../firebase/auth';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-slate-900 backdrop-blur-sm border-b border-teal-500/20 shadow-lg p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-full px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.jpg" alt="FINORA Logo" className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all object-cover" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white tracking-wide">FINORA</span>
            <span className="text-xs text-teal-400 font-light">Accounting</span>
          </div>
        </Link>
        {user && (
          <div className="flex items-center gap-6">
            <div className="text-sm text-right border-r border-slate-700 pr-6">
              <p className="text-slate-400 text-xs font-light uppercase tracking-wide">Account</p>
              <p className="font-light text-slate-200 truncate max-w-xs text-sm">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-light transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
