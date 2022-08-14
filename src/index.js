import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/Index.css';
import App from './App';
import DetailPage from './Pages/DetailPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route>
          <Route exact path='/' element={<App />} />
          <Route path="/detail" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
ReactDOM.render(<Index />, document.getElementById("root"));
