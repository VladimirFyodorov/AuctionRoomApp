import './Table.css';
import Button from '../Button';
import Timer from '../Timer';

export default function Table ({ data, thisUser, bettingUser, startBet, deadline, setDeadline }) {
	const ids = Object.keys(data).map(key => +key);
  return (
		<table>
			<TimerRow  ids={ids} bettingUser={bettingUser} deadline={deadline} setDeadline={setDeadline}/>
			<TableHeader data={data} ids={ids} />
			<tbody>
				<PriceRow data={data} ids={ids} />
				<ButtonsRow ids={ids} thisUser={thisUser} startBet={startBet}/>
			</tbody>
		</table>
	);
}

function TimerRow({ bettingUser, ids, deadline, setDeadline }) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === bettingUser) return <th key={id}><Timer deadline={deadline} setDeadline={setDeadline}/></th>;
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

function ButtonsRow({ ids, thisUser,  startBet}) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === thisUser) return <td key={id}><Button startBet={startBet}/></td>;
		return <td key={id}></td>;
	});
	return (
		<tr className="main">
			<td>Действия</td>
			{ tds }
		</tr>
	);
}
