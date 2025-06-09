import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
  timeLeft: number;
  isRunning: boolean;
  sessionType: 'work' | 'shortBreak' | 'longBreak';
  workSessions: number;
  settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
  };
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateSettings: (newSettings: Partial<TimerContextType['settings'] & { currentSessionType?: 'work' | 'shortBreak' | 'longBreak' }>) => void;
}

const defaultSettings = {
  workDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  sessionsUntilLongBreak: 4,
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(defaultSettings.workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [workSessions, setWorkSessions] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();

    if (sessionType === 'work') {
      const newWorkSessions = workSessions + 1;
      setWorkSessions(newWorkSessions);

      if (newWorkSessions % settings.sessionsUntilLongBreak === 0) {
        setSessionType('longBreak');
        setTimeLeft(settings.longBreakDuration);
      } else {
        setSessionType('shortBreak');
        setTimeLeft(settings.shortBreakDuration);
      }
    } else {
      setSessionType('work');
      setTimeLeft(settings.workDuration);
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.workDuration);
    setSessionType('work');
  };

  const updateSettings = (newSettings: Partial<TimerContextType['settings'] & { currentSessionType?: 'work' | 'shortBreak' | 'longBreak' }>) => {
    const { currentSessionType, ...otherSettings } = newSettings;
    
    if (currentSessionType) {
      setSessionType(currentSessionType);
      switch (currentSessionType) {
        case 'work':
          setTimeLeft(settings.workDuration);
          break;
        case 'shortBreak':
          setTimeLeft(settings.shortBreakDuration);
          break;
        case 'longBreak':
          setTimeLeft(settings.longBreakDuration);
          break;
      }
    }

    if (Object.keys(otherSettings).length > 0) {
      setSettings((prev) => ({ ...prev, ...otherSettings }));
      if (!isRunning && !currentSessionType) {
        setTimeLeft(otherSettings.workDuration || settings.workDuration);
      }
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        sessionType,
        workSessions,
        settings,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 