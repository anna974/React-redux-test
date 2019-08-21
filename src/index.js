import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { combineReducers, createStore} from 'redux';
import reducer from './store/reducer';

// const allReducers = combineReducers({
//     reducer1: reducer,
//     reducer2: reducer2
// });


const store = createStore(reducer);


ReactDOM.render(<Provider store= {store}><App /></Provider>, document.getElementById('root'));
