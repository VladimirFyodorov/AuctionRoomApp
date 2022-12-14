import './Timer.css';

export default function Timer({ timer }) {
  if (!timer.active) return <></>;
  return <div className="timer">{ timer.countdown }</div>;
}
