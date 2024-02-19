import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Stream from "./components/stream";
import Viewer from "./components/viewer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </Router>
  );
};

export default App;
