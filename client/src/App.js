import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/Layout/Alert';
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Home from './components/Layout/Home'
import PrivateRoute from './components/routing/PrivateRoute'
import Header from './components/Layout/Header';

function App() {
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

useEffect(() => {
  store.dispatch(loadUser());
}, []);
  return (
    <Provider store={store}>
    <div className="App">
    <Router>
    <Header />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/home' component={Home} />
          </Switch>
        </Router>
    </div>
    </Provider>
  );
}

export default App;
