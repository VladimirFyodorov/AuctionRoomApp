import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path';
import url from 'url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
const data = {
	1: { participant: { id: 1, name: 'ООО Ласточка'}, offer: { price: 100 } },
	2: { participant: { id: 2, name: 'ООО Бабочка'}, offer: { price: 99 } },
};
let bet = {user: '', deadline: ''};


wss.on('connection', function connection(ws) {
	ws.send(JSON.stringify(bet));
	
  ws.on('message', function message(data) {
		const parsedData = JSON.parse(data);
		if (
			(bet.user === parsedData.user && parsedData.deadline === '') // ending bet
			|| (bet.deadline === '') // starting bet and bet edit is empty
			|| (dayjs(bet.deadline).diff(dayjs.utc()) < 0) // deadline past now
			) {
			bet = parsedData;
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
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

app.get("/", (req, res) => {
	console.log('Sending html');
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(5000, () => {
	console.log('Server started on port 5000');
})
