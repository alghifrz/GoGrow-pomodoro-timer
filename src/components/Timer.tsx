import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { Settings } from './Settings';

export function Timer() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    timeLeft,
    isRunning,
    sessionType,
    workSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    settings,
    updateSettings,
  } = useTimer();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSessionTypeLabel = (type: string): string => {
    switch (type) {
      case 'work':
        return 'Work Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return '';
    }
  };

  const getSessionColor = (type: string): string => {
    switch (type) {
      case 'work':
        return 'from-red-500 to-orange-500';
      case 'shortBreak':
        return 'from-green-500 to-emerald-500';
      case 'longBreak':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const switchToWork = () => {
    if (isRunning) pauseTimer();
    updateSettings({ currentSessionType: 'work' });
  };

  const switchToShortBreak = () => {
    if (isRunning) pauseTimer();
    updateSettings({ currentSessionType: 'shortBreak' });
  };

  const switchToLongBreak = () => {
    if (isRunning) pauseTimer();
    updateSettings({ currentSessionType: 'longBreak' });
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-lg rounded-3xl transform -rotate-1"></div>
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
        {/* Session Type Tabs */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={switchToWork}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  sessionType === 'work'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Work
              </button>
              <button
                onClick={switchToShortBreak}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  sessionType === 'shortBreak'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Short Break
              </button>
              <button
                onClick={switchToLongBreak}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  sessionType === 'longBreak'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Long Break
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="ml-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Open settings"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">
            Completed Sessions: <span className="text-indigo-600 font-bold">{workSessions}</span>
          </p>
        </div>

        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <div className="relative text-8xl font-bold text-gray-900 font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="group relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105"
              aria-label="Start timer"
            >
              <span className="relative z-10">Start</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="group relative px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
              aria-label="Pause timer"
            >
              <span className="relative z-10">Pause</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
          <button
            onClick={resetTimer}
            className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105"
            aria-label="Reset timer"
          >
            <span className="relative z-10">Reset</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
} 