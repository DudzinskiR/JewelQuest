import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
export const useTimers = () => {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  useEffect(() => {
    return clearAllTimers;
  }, []);

  const newTimer = (callback: () => void, time: number, name?: string) => {
    if (!name) {
      name = uuidv4();
    }
    if (timers.current[name]) {
      clearTimeout(timers.current[name]);
    }

    timers.current[name] = setTimeout(
      (name: string) => {
        delete timers.current[name];
        callback();
      },
      time,
      name
    );

    return name;
  };

  const getTimer = (name: string) => {
    return timers.current[name];
  };

  const clearTimer = (name: string) => {
    if (timers.current[name]) {
      clearTimeout(timers.current[name]);
      delete timers.current[name];
    }
  };

  const getAllTimers = () => {
    return timers;
  };

  const clearAllTimers = () => {
    for (const [key, value] of Object.entries(timers.current)) {
      clearTimeout(value);
      delete timers.current[key];
    }
  };

  return { newTimer, getTimer, clearAllTimers, clearTimer, getAllTimers };
};
