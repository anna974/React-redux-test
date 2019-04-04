import React, { Component } from 'react';
import './App.css';
import ListeActivites from './Components/ListeActivites'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListeActivites />
      </div>
    );
  }
}

export default App;
