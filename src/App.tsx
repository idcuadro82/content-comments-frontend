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
          <Book volume="1" />
        </Route>
        <Redirect exact from="/" to="/book1" />
      </Switch>
    </Router>
  );
};

export default App;
