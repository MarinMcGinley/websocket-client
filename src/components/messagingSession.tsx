import * as React from 'react';
import { startWebsocket, sendMessage, Message } from '../logic/websocketConnector';
const signalR = require("@microsoft/signalr");

type MyState = {
    id: string,
    message: string,
    websocketUrl: string,
    connection: any,
};

class MessagingSession extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            message: '',
            websocketUrl: process.env.REACT_APP_WEBSOCKET_URL,
            connection: {}
        }

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.connectToWebsocket = this.connectToWebsocket.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    

    handleMessageChange(event: any) {
        this.setState({ message: event.target.value });
    }

    handleIdChange(event: any) {
        this.setState({ id: event.target.value });
    }

    connectToWebsocket(event: any) {
        event.preventDefault();
        console.log('testing connecting to websocket');
        startWebsocket();
        this.setState({
            connection: new signalR.HubConnectionBuilder()
                .withUrl(`${this.state.websocketUrl}/messaginghub`)
                .build()
                .on("OnConnectedAsync", (data: any) => {
                    console.log(data);
                })
        });
    }

    sendMessage(event: any) {
        event.preventDefault();

        console.log('sendMessage test');
        console.log(this.state.id);

        const message: Message = {
            To: parseInt(this.state.id),
            From: 2,
            Message: this.state.message
        };

        sendMessage(message);
    }

    render() {

        return (
            <form>
                <p>Hello World!</p>
                <div>
                    <label>insert id here</label>
                    <input type="text" value={this.state.id} onChange={this.handleIdChange}/>
                </div>
                <div>
                    <label>insert message here</label>
                    <input type="text" value={this.state.message} onChange={this.handleMessageChange}/>
                </div>
                <input type="submit" value="Connect" onClick={this.connectToWebsocket} />
                <input type="submit" value="Send message" onClick={this.sendMessage} />
            </form>
        );
    }
}

export default MessagingSession;