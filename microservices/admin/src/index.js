import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authActions from './actions/authActions';

const { checkRoutine } = authActions;

// Check user authentication
store.dispatch(checkRoutine.trigger());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App store={store}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
