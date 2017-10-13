// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

// ======================================================================= 
import React from 'react'
import { Provider } from 'react-redux';
import configureStore from './store';
import Header from './components/header'
import ToolBar from './components/toolbar'
import Container from './components/container'

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="container">
      <Header />
      <ToolBar />
      <Container />
    </div>
  </Provider>
)

export default App

