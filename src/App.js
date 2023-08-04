import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Watchlist } from "./components/Watchlist";
import { Add } from "./components/Add";
import "./App.css";

import { GlobalProvider } from "./context/GlobalState";
import { Popular } from "./components/Popular";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Switch>

          <Route exact path="/">
            <Popular />
          </Route>
          <Route path="/watchlist">
            <Watchlist />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
