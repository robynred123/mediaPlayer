import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers';
import { Routes } from './src/routes'

const store = createStore(reducers, {}, applyMiddleware(thunk))

export const App = () => {
  return (
    <Provider store={store}>
      <Routes /> 
    </Provider>
  );
}