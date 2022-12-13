import './Form.css';

export default function Form({ data }) {
	const ids = Object.keys(data);
	const options = ids.map(id => <option key={id} value={id}>{ data[id].participant.name }</option>)
  return (
		<div className="form">
			<p>Выберите участника торгов</p>
			<select>
				{ options }
			</select>
		</div>
	)
}
