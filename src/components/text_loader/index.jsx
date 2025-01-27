import { useState, useEffect } from 'react';
import '@/components/text_loader/index.scss';

const TextLoader = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    // Set an interval to update the dot count every 500ms
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount + 1) % 4); // Cycle through 0,1,2,3
    }, 500); // Adjust the speed by changing the interval duration

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Generate the dots based on the current dot count
  const dots = '.'.repeat(dotCount);

  return (
    <div className="loader" role="status" aria-live="polite">
      <span>Loading{dots}</span>
    </div>
  );
};

export default TextLoader;
