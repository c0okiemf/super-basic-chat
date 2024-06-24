
import express from 'express';
import { createClient } from 'redis';
import { Server } from "socket.io";
import http from 'http';

const app = express()
const port = 3000

app.use(express.json());

// Redis Client
const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

// Socket.io
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Routes
app.post('/message', async (req, res) => {
    const message = req.body.message;
    const userName = req.body.userName;

    const messageObj = {
        userName,
        message,
    };

    await client.rPush('messages', JSON.stringify(messageObj));

    io.emit('newMessage', messageObj);

    res.json({
        message: "Received!",
    });
});

app.get('/messages', async (req, res) => {
    // Use LRANGE to get all elements from the list
    const messages = await client.lRange('messages', 0, -1);

    let parsedMessages = [];
    try {
        parsedMessages = messages.map(m => JSON.parse(m));
    } catch (e) {
        console.warn('Error parsing messages', e);
    }

    res.json({
        messages: parsedMessages,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
server.listen(3001, () => {
    console.log('Socket.io server started');
});