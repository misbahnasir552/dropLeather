'use client';

import { useEffect, useState } from 'react';

interface UseCounterOptions {
  initialCount?: number;
}

interface UseCounterResult {
  count: number;
  formattedCount: string;
  resetCounter: () => void;
}

const useCounter = ({
  initialCount = 60,
}: UseCounterOptions): UseCounterResult => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const resetCounter = (): void => {
    setCount(initialCount);
  };

  const formatCount = (value: number): string => {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    // console.log("formatted minutes and seconds",formattedMinutes, formattedSeconds)
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const formattedCount = formatCount(count);

  return {
    count,
    formattedCount,
    resetCounter,
  };
};

export default useCounter;
