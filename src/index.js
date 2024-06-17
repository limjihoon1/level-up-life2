import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LevelRouter from './LevelRouter';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import MainReducer from './redux/MainReducers';


const store= createStore( MainReducer )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/* <App /> */}
  //   <LevelRouter></LevelRouter>
  // </React.StrictMode>

  <Provider store={store}>
    <LevelRouter/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
