'use client';

import { TimerProvider } from '../context/TimerContext';
import { Timer } from '../components/Timer';

export default function Home() {
  return (
    <TimerProvider>
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Pomodoro Timer
            </h1>
            <p className="text-gray-600 text-lg">
              Boost your productivity with focused work sessions
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Timer />
          </div>
        </div>
      </main>
    </TimerProvider>
  );
}
