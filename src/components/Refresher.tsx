import React, { useEffect, useState } from "react";

type RefresherProps = {
  fetchEmails: () => void;
};

const Refresher = ({ fetchEmails }: RefresherProps) => {
  const [progress, setProgress] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const timeLimit = 15;

    const startRefresh = () => {
      setProgress(0);
      setSecondsRemaining(timeLimit);

      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1 / timeLimit;

          if (newProgress >= 1) {
            fetchEmails();

            clearInterval(interval);

            startRefresh();
          }

          return newProgress;
        });

        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }

          return prevSeconds;
        });
      }, 1000);
    };

    startRefresh();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-10 h-10 relative">
        <div className="w-full h-full absolute rounded-full border-t-4 border-blue-500 animate-spin"></div>
        <div className="w-full h-full absolute rounded-full border-2 border-gray-300"></div>
        <div className="absolute w-full h-full flex items-center justify-center text-gray-500 text-xs">
          {secondsRemaining} s
        </div>
      </div>
    </div>
  );
};

export default Refresher;
