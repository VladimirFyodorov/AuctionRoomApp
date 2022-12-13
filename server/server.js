const express = require('express');
const app = express();

app.get("/api", (req, res) => {
	const data = { 
		1: 
			{
				participant: { id: 1, name: 'ООО Ласточка'},
				offer: { price: 100 },
			},
		2: 
			{
				participant: { id: 2, name: 'ООО Бабочка'},
				offer: { price: 99 },
			}
	};
	console.log('Fetch data from server');
  res.json(data)
})

app.listen(5000, () => {
	console.log('Server started on port 5000');
})
