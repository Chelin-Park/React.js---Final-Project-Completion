import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TodoList from './components/TodoList';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-navigation">
          <ul className="App-navigation-list">
            <li className="App-navigation-item">
              <Link to="/" className="App-navigation-link">
                Home
              </Link>
            </li>
            <li className="App-navigation-item">
              <Link to="/todos" className="App-navigation-link">
                Todos
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/todos">
            <TodoList />
          </Route>
          {}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
