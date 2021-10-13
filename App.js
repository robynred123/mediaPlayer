import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './src/reducers';
import { Routes } from './src/routes'

const store = createStore(reducers)

export const App = () => {
  return (
    <Provider store={store}>
      <Routes /> 
    </Provider>
  );
}