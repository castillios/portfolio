import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './styles/global.css';
import './App.css';

import Nav from './components/Navbar/index.jsx';
import Home from './pages/home';
import About from './pages/about';
import Projects from './pages/projects';
import Contact from './pages/contact';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Nav id="navbar"/>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
