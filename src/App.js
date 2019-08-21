import React, { Component } from 'react';
import './App.css';
import ListeActivites from './Components/ListeActivites'
import { connect } from 'react-redux';
class App extends Component {


  render() {
    return (
      <div className="App">
        {/* <ListeActivites /> */}
        <div>Age: <span>{this.props.age}</span></div>
        <button onClick={this.props.onAgeUp}>Age Up</button>
        <button onClick={this.props.onAgeDown}>Age Down</button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    age: state.age
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAgeUp: () => dispatch({type: 'AGE_UP', value: 10}),
    onAgeDown: () => dispatch({type: 'AGE_DOWN', value: 5}),

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
