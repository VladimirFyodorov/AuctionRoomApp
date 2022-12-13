import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import './Timer.css';

dayjs.extend(utc);
dayjs.extend(duration);

export default function Timer({ bet }) {
  const [timerStr, setTimerStr] = useState('');

  useEffect(() => {
    const now = dayjs.utc();
    if (bet.deadline !== '' && bet.deadline.diff(now) > 0) {
      const interval = setInterval(() => {
        const diff = bet.deadline.diff(now);
        const str = dayjs.duration(diff).format('HH:mm:ss');
        setTimerStr(str);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerStr, bet.deadline]);

  if (bet.deadline !== '' && bet.deadline.diff(dayjs.utc()) > 0) {
    return (
      <div className="timer">
        {timerStr}
      </div>
    )
  } return <></>;
}
