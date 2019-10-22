import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import App from './App';
import About from './about';

export default () => (
    <Router>
        <div>
          <nav>
            <ul>

              {/* <li>
                <Link to="/about">About</Link>
              </li> */}

            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/about" component={About} />

          </Switch>
        </div>
      </Router>
);