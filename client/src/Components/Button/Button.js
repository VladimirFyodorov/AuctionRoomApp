export default function Button({ startBet, endBet, timer }) {

	if (timer.btnAction === '') return <></>
	if (timer.btnAction === 'start bet') return <button onClick={startBet}>{ timer.btnText }</button>
	if (timer.btnAction === 'end bet') return <button onClick={endBet}>{ timer.btnText }</button>
};
