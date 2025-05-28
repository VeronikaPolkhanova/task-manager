"use client";

import React, { useEffect, useState } from "react";

interface TaskTimerProps {
  startedAt: number | null;
  timeLimit: number | null;
}

const formatTime = (ms: number): string => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};

const TaskTimer: React.FC<TaskTimerProps> = ({ startedAt, timeLimit }) => {
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    if (!startedAt || !timeLimit) return;

    const update = () => {
      const diff = timeLimit * 60000 - (Date.now() - startedAt);
      setRemaining(Math.max(0, diff));
    };

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [startedAt, timeLimit]);

  if (!startedAt || !timeLimit) {
    return <div className={`text-gray-400`}>Not started</div>;
  }

  const isOverdue = remaining <= 0;

  return (
    <div
      className={`font-mono text-sm ${
        isOverdue ? "text-red-600" : "text-gray-700"
      } `}>
      ⏳ Remaining time: {formatTime(remaining)}
      {isOverdue && (
        <span className="ml-2 text-xs font-semibold">Time is over</span>
      )}
    </div>
  );
};

export default TaskTimer;
