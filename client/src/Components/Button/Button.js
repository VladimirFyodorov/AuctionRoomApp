import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function Button({ thisUser, bet, startBet, endBet }) {
	const onClick = () => {
		if (bet.user === thisUser && bet.deadline !== '' && dayjs(bet.deadline).diff(dayjs.utc()) > 0) {
			endBet();
		} else {
			startBet();
		}
	};

	return (
		<button onClick={onClick}>Начать ход</button>
	)
};
