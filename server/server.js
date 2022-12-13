import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const data = {
	1: { participant: { id: 1, name: 'ООО Ласточка'}, offer: { price: 100 } },
	2: { participant: { id: 2, name: 'ООО Бабочка'}, offer: { price: 99 } },
};
let bet = {user: '', deadline: ''};


wss.on('connection', function connection(ws) {
	console.log('A new client connected');
	ws.send(JSON.stringify(bet));
	
  ws.on('message', function message(data) {
		const parsedData = JSON.parse(data);
		console.log('dayjs(bet.deadline).diff(dayjs.utc()) ', dayjs(bet.deadline).diff(dayjs.utc()));
		if (
			(bet.user === parsedData.user && parsedData.deadline === '') // ending bet
			|| (bet.deadline === '') // starting bet and bet edit is empty
			|| (dayjs(bet.deadline).diff(dayjs.utc()) < 0) // deadline past now
			) {
			bet = parsedData;
			console.log('JSON.stringify(bet) ', JSON.stringify(bet));
			ws.send(JSON.stringify(bet));
			wss.clients.forEach(client => {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(bet));
				}
			})
		}
  });
});


app.get("/api", (req, res) => {
	console.log('Fetch data from server');
  res.json(data)
})


server.listen(5000, () => {
	console.log('Server started on port 5000');
})
