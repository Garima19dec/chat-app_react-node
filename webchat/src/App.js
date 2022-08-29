// import socketIO from "socket.io-client";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';

// const ENDPOINT = "http://localhost:4500/";
// const socket = socketIO(ENDPOINT, { transports: ['websocket'] });

function App() {

  // socket.on("connect", () => {})


  return (
    <div className="App">
      {/* <h1>working</h1> */}

      <Router>
        <Routes>
          <Route path="/" element={<Join/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
