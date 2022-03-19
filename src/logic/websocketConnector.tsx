
const signalR = require("@microsoft/signalr");

const url = `${process.env.REACT_APP_WEBSOCKET_URL}/messagingHub`;

const connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on('receiveConnId', (connectionId: string) => {
    console.log('connection.on receiveConnId');
    console.log('typeof: ' + typeof(connectionId) + ', ' + connectionId);
    const userMapCombo: UserMapCombo = {
        UserId: parseInt('3'),
        ConnectionId: connectionId
    };
    console.log(userMapCombo);
    connection.invoke('AddUserToMap', JSON.stringify(userMapCombo));
});

connection.on('receiveMessage', (data: any) => {
    console.log('connection.on receiveMessage');
    console.log(data);
});

connection.on('userAddedToMap', (data: { int: string }) => {
    console.log('userAddedToMap');
    console.log(data);
})

export interface Message {
    To: number;
    From: number;
    Message: string;
}

export interface UserMapCombo {
    UserId: number;
    ConnectionId: string;
}

export async function sendMessage(message: Message) {
    connection.invoke('SendMessageAsync', JSON.stringify(message))
        .then((results: any) => {
            console.log('results from SendMessage');
            console.log(results);
        })
        .catch((error: any) => {
            console.log('error on SendMessage');
            console.log(error);
        })
};


export async function startWebsocket() {
    console.log('trying to start');
    console.log(`Url: ${url}`)
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log('Websocket connector error');
        console.log(err);
        // setTimeout(startWebsocket, 5000);
    }
};