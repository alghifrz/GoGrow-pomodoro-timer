import React from 'react';
import { useTimer } from '../context/TimerContext';
import { Modal } from './Modal';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Settings({ isOpen, onClose }: SettingsProps) {
  const { settings, updateSettings } = useTimer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    if (!isNaN(numValue) && numValue > 0) {
      updateSettings({
        [name]: numValue * 60, // Convert minutes to seconds
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Timer Settings">
      <div className="space-y-6">
        <div className="group">
          <label htmlFor="workDuration" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
            Work Duration (minutes)
          </label>
          <div className="relative">
            <input
              type="number"
              id="workDuration"
              name="workDuration"
              min="1"
              value={settings.workDuration / 60}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              aria-label="Work duration in minutes"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="shortBreakDuration" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
            Short Break Duration (minutes)
          </label>
          <div className="relative">
            <input
              type="number"
              id="shortBreakDuration"
              name="shortBreakDuration"
              min="1"
              value={settings.shortBreakDuration / 60}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              aria-label="Short break duration in minutes"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="longBreakDuration" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
            Long Break Duration (minutes)
          </label>
          <div className="relative">
            <input
              type="number"
              id="longBreakDuration"
              name="longBreakDuration"
              min="1"
              value={settings.longBreakDuration / 60}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              aria-label="Long break duration in minutes"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
          </div>
        </div>

        <div className="group">
          <label htmlFor="sessionsUntilLongBreak" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors">
            Sessions Until Long Break
          </label>
          <div className="relative">
            <input
              type="number"
              id="sessionsUntilLongBreak"
              name="sessionsUntilLongBreak"
              min="1"
              value={settings.sessionsUntilLongBreak}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              aria-label="Number of work sessions before long break"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 