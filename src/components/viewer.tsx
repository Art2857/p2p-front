import React, { RefObject } from "react";
import { Link } from "react-router-dom";
import SimplePeer from "simple-peer";
import { io } from "socket.io-client";

class Viewer extends React.Component {
  private myVideo: RefObject<HTMLVideoElement> = React.createRef();

  startViews(): void {
    const socket = io("http://localhost:3001");

    const peerAnswer = new SimplePeer({ trickle: false });

    socket.emit("startViews");

    socket.on("streamerSdp", (streamerSdp) => {
      console.log("streamerSdp", streamerSdp);
      peerAnswer.signal(streamerSdp);
    });

    peerAnswer.on("signal", (clientSdp) => {
      console.log("clientSdp", clientSdp);
      socket.emit("clientSdp", clientSdp);
    });

    peerAnswer.on("stream", (stream) => {
      this.myVideo.current!.srcObject = stream;
    });
  }

  render() {
    return (
      <div>
        <header>Просмотр стрима</header>

        <Link to="/">
          <button>На Главную</button>
        </Link>

        <button className="input_offer" onClick={() => this.startViews()}>
          Посмотреть стрим
        </button>

        <div style={{ marginTop: 50 }}>
          <video
            ref={this.myVideo}
            onLoadedMetadata={() => {
              this.myVideo.current!.play();
            }}
            width="640"
            height="360"
            controls
          ></video>
        </div>
      </div>
    );
  }
}

export default Viewer;
