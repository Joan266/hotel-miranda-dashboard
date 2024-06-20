import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from 'react'; 
import { App } from './App.jsx'; 
import './index.css';

const root = document.getElementById('root');
const app = ReactDOM.createRoot(root);

app.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);