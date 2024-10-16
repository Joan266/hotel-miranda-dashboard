import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';

const root = document.getElementById('root') as HTMLElement;
const app = ReactDOM.createRoot(root);

app.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);