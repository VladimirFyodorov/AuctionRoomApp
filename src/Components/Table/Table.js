import './Table.css';

export default function Table ({ data }) {
	const ids = Object.keys(data);
  return (
		<table>
			<TableHeader data={data} ids={ids} />
			<tbody>
				<PriceRow data={data} ids={ids} />
			</tbody>
		</table>
	);
}


function TableHeader({ data, ids }) {
	const trs1 = ids.map(id => (<th key={id}>Участник №{id}</th>))
	const trs2 = ids.map(id => (<th key={id}>{data[id].participant.name }</th>));
	return (
		<thead>
			<tr>
				<th>Параметры</th>
				{ trs1 }
			</tr>
			<tr>
				<th></th>
				{ trs2 }
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
