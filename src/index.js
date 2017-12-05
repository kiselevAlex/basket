import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Basket from './containers/Basket';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import './css/bootstrap.css';
import './css/bootstrap-grid.css';
import './css/bootstrap-reboot.css';
import './css/font-awesome.css';
import './css/carusel_tovars_block.css';
import './css/main.css';
import './css/modal.css';
import './css/slider.css';
import './css/styles.css';

const store = configureStore()

ReactDOM.render(<Provider store={store}>
                    <Basket />
                  </Provider>, 
                document.getElementById('root'));
