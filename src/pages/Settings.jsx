import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import { getUserData, updateUserSettings } from '../firebase/db';

export default function Settings() {
  const { user } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    businessName: '',
    currency: 'NPR',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      try {
        const userData = await getUserData(user.uid);
        if (userData) {
          setSettings({
            businessName: userData.businessName || '',
            currency: userData.currency || 'NPR',
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUserSettings(user.uid, settings);
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating settings');
      console.error('Error:', error);
    }
  };

  return (
    <div className="ml-64 pt-24 p-8 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600 text-base">Manage your account and application preferences</p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-8 font-medium text-sm">
          ✓ {message}
        </div>
      )}

      {/* Settings Container */}
      <div className="max-w-3xl space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white p-7 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 cursor-not-allowed text-slate-600 text-sm"
              />
              <p className="text-xs text-slate-500 mt-2">Email address cannot be changed</p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 text-sm">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) =>
                  setSettings({ ...settings, businessName: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 text-sm"
                placeholder="Enter your business name"
              />
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white p-7 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Preferences</h2>
          <div>
            <label className="block text-slate-700 font-semibold mb-2 text-sm">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 text-sm"
            >
              <option value="NPR">NPR (Nepalese Rupee)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="INR">INR (Indian Rupee)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">Choose your preferred currency for all transactions</p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-colors text-base"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
