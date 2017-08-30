import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import Items from "./components/items";
import EditItem from "./components/edititem";
import App from "./App";
import './index.css';

import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

ReactDOM.render(<MuiThemeProvider>
                  <Router history={browserHistory}>
                    <Route path="/" component={App}>
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={SignUp} />
                      <Route path="/dashboard" component={Dashboard} />
                      <Route path="/bucketlists/:id" component={Items} />
                      <Route path="/bucketlists/:id/items/:item_id" component={EditItem} />
                    </Route>
                  </Router>
                </MuiThemeProvider>
                , document.getElementById('root'));

registerServiceWorker();
