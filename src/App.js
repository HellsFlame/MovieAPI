import "./App.css";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import NowPlaying from "./components/NowPlaying";
import Footer from "./components/Footer";
import SingleMovie from "./components/SingleMovie";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="h-screen bg-[rgb(36,36,36)]">
        <Routes>
          <Route path="/" element={<NowPlaying />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
