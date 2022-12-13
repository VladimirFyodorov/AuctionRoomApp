import './Header.css';

export default function Header() {
	let today = new Date();
	today.setDate(today.getDate() + 1)
	const strDatetime = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()} 23:59`;

  return (
		<header>
			Торги на младшего фронтенд разработчика ({strDatetime})
		</header>
	)
}
