import React from 'react'
import { Provider } from 'react-redux';
import configureStore from './store';
import Header from './components/header'
import ToolBar from './components/toolbar'
import Container from './components/container'

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="container-fluid">
      <Header />
      <ToolBar />
      <Container />
    </div>
  </Provider>
)

export default App
