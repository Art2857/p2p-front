import React from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
class Main extends React.Component {
  render() {
    return (
      <div>
        <header>Главная</header>
        <Link to="/stream">
          <button>Go to Stream</button>
        </Link>
        <Link to="/viewer">
          <button>Go to Watch</button>
        </Link>
      </div>
    );
  }
}

export default Main;
