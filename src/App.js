import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Start/Home";
import Battle from "./components/Battle/Battle";
import Gallery from "./components/Gallery/Gallery";
import Stats from "./components/Stats/Stats";
import History from "./components/History/History";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/battle">Battle</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/statistics">Stats</Link>
            <Link to="/history">History</Link>
          </nav>
        </header>

        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/battle">
              <Battle />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
            <Route path="/statistics">
              <Stats />
            </Route>
            <Route path="/history">
              <History />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
