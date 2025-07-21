"use client";

import React, { useEffect, useState } from "react";
import { cn } from "./lib/utils/cn";
import { formatTime } from "./lib/utils/formatDate";

interface TaskTimerProps {
  startedAt: number | null;
  timeLimit: number;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ startedAt, timeLimit }) => {
  const [remaining, setRemaining] = useState(timeLimit);

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

  const isOverdue = remaining === 0;

  return (
    <div
      className={cn(
        "font-mono text-sm",
        isOverdue ? "text-red-600" : "text-gray-700"
      )}>
      ⏳ Remaining time: {formatTime(remaining, timeLimit.toString())}
      {isOverdue && (
        <span className="ml-2 text-xs font-semibold">Time is over</span>
      )}
    </div>
  );
};

export default TaskTimer;
