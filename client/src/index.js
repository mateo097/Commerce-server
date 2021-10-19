import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux'
import store from './data/store';

//components
import Navbar from './components/navbar/navbar.component'
import Register from './screens/Register';


ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={App} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
    <App />
  </Provider>,
  document.getElementById('root')
);

