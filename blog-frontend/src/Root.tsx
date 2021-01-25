import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App';
import create from './redux/create';

const store = create();
const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
