import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import GetOrder from './GetOrder';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import SignUp from './SignUp';
import Stores from './stores';
import StoreDetail from './StoreDetail';
import MenuDetail from './MenuDetail';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<GetOrder />} />
        <Route path="/signUp" element={<SignUp />} />  
        <Route path="/stores" element={<Stores />} />
        <Route path="/store/:storeId" element={<StoreDetail />} />  
        <Route path="/MenuDetail" element={<MenuDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
