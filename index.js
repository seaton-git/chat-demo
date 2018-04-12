var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
	port: 3029,
	verifyClient: socketVerify
});

function socketVerify(info) {
	return true;
}

wss.broadcast = (s, ws) => {
	wss.clients.forEach((client) => {
		client.send(`${ws.nick_name}: ${ws.chat_text}`);
	});
};

wss.on('connection', (ws) => {
	ws.send(JSON.stringify(`你是第${wss.clients.size}位`));

	ws.on('message', (jsonStr, flags) => {
		var obj = JSON.parse(jsonStr);
		wss.broadcast(1, obj);
	});

	ws.on('close', (close) => {
		console.log(close);
	});
});