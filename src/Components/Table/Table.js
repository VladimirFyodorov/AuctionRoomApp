import './Table.css';
import Button from '../Button';
import Timer from '../Timer';

export default function Table ({ data }) {
	const ids = Object.keys(data);
  return (
		<table>
			<TimerRow  ids={ids} currentMovingUserId='2'/>
			<TableHeader data={data} ids={ids} />
			<tbody>
				<PriceRow data={data} ids={ids} />
				<ButtonsRow ids={ids} userId='1'/>
			</tbody>
		</table>
	);
}

function TimerRow({ currentMovingUserId, ids }) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === currentMovingUserId) return <th key={id}><Timer/></th>;
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

function ButtonsRow({ userId, ids }) {
	// render button only for current user else render empty td
	const tds = ids.map(id => {
		if (id === userId) return <td key={id}><Button/></td>;
		return <td key={id}></td>;
	});
	return (
		<tr className="main">
			<td>Действия</td>
			{ tds }
		</tr>
	);
}
