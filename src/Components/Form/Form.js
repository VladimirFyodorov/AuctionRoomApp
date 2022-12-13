import './Form.css';

export default function Form({ data, thisUser, setThisUser }) {
	const ids = Object.keys(data).map(key => +key);
	const options = ids.map(id => <option key={id} value={id}>{ data[id].participant.name }</option>)
  return (
		<div className="form">
			<p>Выберите участника торгов</p>
			<select value={thisUser} onChange={(e) => setThisUser(+e.target.value)}>
				{ options }
			</select>
		</div>
	)
}
