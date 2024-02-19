import React from "react";
import { Link } from "react-router-dom";
import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

class Stream extends React.Component {
  startStream() {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Подключено к серверу socket.io");
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log("Стрим запускается...");
        const peerInitiator = new SimplePeer({
          initiator: true,
          trickle: false,
          stream,
        });

        peerInitiator.on("signal", (streamerSdp) => {
          socket.emit("startStream", streamerSdp);
          console.log("Можно смотреть!");
        });

        socket.on("clientSdp", (clientSdp) => {
          console.log("clientSdp", clientSdp);
          peerInitiator.signal(clientSdp);
        });
      });
  }

  render() {
    return (
      <div>
        <header>Стримерская</header>
        <Link to="/">
          <button>На Главную</button>
        </Link>

        <button className="input_offer" onClick={() => this.startStream()}>
          Начать стрим
        </button>
        <br />
      </div>
    );
  }
}

export default Stream;
