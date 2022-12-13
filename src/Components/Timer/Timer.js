import { useEffect } from 'react';
import './Timer.css';

export default function Timer({ deadline, setDeadline }) {
  const minutes = Math.floor(deadline / 60);
  const seconds = deadline % 60;
  const secStr = (seconds > 9) ? seconds : `0${seconds}`;
  const str = `00:0${minutes}:${secStr}`;

  useEffect(() => {
    if (deadline > 0) {
      const interval = setInterval(() => {
        setDeadline(deadline - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [deadline]);

  return (
		<div className="timer">
			{str}
		</div>
	)
}
