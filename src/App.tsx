import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Book from './components/Book/Book';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/book1">
          <Book idBook="4b900a74-e2d9-4837-b9a4-9e828752716e" />
        </Route>
        <Redirect exact from="/" to="/book1" />
      </Switch>
    </Router>
  );
};

export default App;
