export const formatTime = (ms: number, timeLimit: string): string => {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min.toString().padStart(timeLimit.length, timeLimit)}:${sec
    .toString()
    .padStart(2, "0")}`;
};
