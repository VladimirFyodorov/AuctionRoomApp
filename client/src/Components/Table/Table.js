import './Table.css';
import Button from '../Button';
import Timer from '../Timer';
import useTimer from '../useTimer';

export default function Table ({ data, thisUser, bet, startBet, endBet }) {
	const timer = useTimer({ thisUser, bet });
	const ids = Object.keys(data).map(key => +key);
  return (
		<table>
			<TimerRow  ids={ids} timer={timer} />
			<TableHeader ids={ids} data={data} />
			<tbody>
				<PriceRow ids={ids} data={data} />
				<ButtonsRow ids={ids} timer={timer} startBet={startBet} endBet={endBet} />
			</tbody>
		</table>
	);
}

function TimerRow({ ids, timer }) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === timer.bettingUser) return <th key={id}><Timer timer={timer}/></th>;
		return <th key={id}></th>;
	});
	return (
		<thead>
			<tr className="main">
				<th>Ход</th>
				{ tds }
			</tr>
		</thead>
	);
}


function TableHeader({ data, ids }) {
	const trs = ids.map(id => {
		return (
			<th key={id}>
				<div className="div-in-th">
					<p>Участник №{id}</p>
					<p>{data[id].participant.name }</p>
				</div>
			</th>
		)
	});
	return (
		<thead>
			<tr>
				<th>Параметры</th>
				{ trs }
			</tr>
		</thead>
	);
};


function PriceRow({ data, ids }) {
	const tds = ids.map(id => (<td key={id}>{data[id].offer.price }</td>));
	return (
		<tr className="main">
			<td>Price</td>
			{ tds }
		</tr>
	);
};

function ButtonsRow({ ids, startBet, endBet, timer }) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === timer.thisUser) return (
			<td key={id}>
				<Button
					startBet={startBet}
					endBet={endBet}
					timer={timer}
				/>
			</td>
			);
		return <td key={id}></td>;
	});
	return (
		<tr className="main">
			<td>Действия</td>
			{ tds }
		</tr>
	);
}
