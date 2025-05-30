import { useState, useEffect } from "react";

const loadingMessages = [
  "Analyzing butterfly effects and quantum possibilities",
  "Calculating alternative timeline branches",
  "Simulating cause-and-effect relationships",
  "Exploring parallel universe mechanics",
  "Generating plausible alternative outcomes",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="text-center">
      <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
        <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
        <h3 className="text-2xl font-semibold mb-4">Calculating Alternative Timeline...</h3>
        <p className="text-gray-300 mb-6">{loadingMessages[messageIndex]}</p>
        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
