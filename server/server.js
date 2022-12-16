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
const bets = {
	1: {
		participant: { id: 1, name: 'ООО Ласточка'},
		offer: { price: 100, perks: 'Чай с печеньками', qualifyingPeriod: '1 месяц'},
	},
	2: {
		participant: { id: 2, name: 'ООО Бабочка'},
		offer: { price: 99, perks: 'Чай с печеньками', qualifyingPeriod: '3 месяца'}, 
	},
	3: {
		participant: { id: 3, name: 'ИП Иванов'},
		offer: { price: 80, perks: '-', qualifyingPeriod: '2 недели'}, 
	},
};
let bet = {user: '', deadline: '', newOffer: {} };


wss.on('connection', function connection(ws) {
	ws.send(JSON.stringify(bet));
	
  ws.on('message', function message(data) {
		const newBet = JSON.parse(data);
		if (
			(bet.deadline === '') // starting bet and bet edit is empty
			|| (dayjs(bet.deadline).diff(dayjs.utc()) < 0) // starting bet and previous bet deadline past now
			|| (bet.user === newBet.user && newBet.deadline === '') // ending bet
			) {
			bet = newBet;
			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(bet));
				}
			})
		}

		// saving new bet in bets
		if (bet.user === newBet.user && newBet.deadline === '') {// ending bet => modify data
			if (newBet.user && bets[newBet.user]) {
				const { offer } = bets[newBet.user];
				bets[newBet.user].offer = { ...offer,  ...newBet.newOffer };
			}
		}
  });
});


app.get("/api", (req, res) => {
	console.log('Fetch data from server');
  res.json(bets);
})

app.get("/", (req, res) => {
	console.log('Sending html');
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

server.listen(5000, () => {
	console.log('Server started on port 5000');
})
