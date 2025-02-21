// In App.js in a new project

import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/mychatapp/Store'
import Navigation from './src/mychatapp/Navigation';


export default function App() {
  return (
    <Provider store={store}>
< Navigation/>
    </Provider>
  );
}