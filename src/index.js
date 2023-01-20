import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/Index.css';
import App from './App';
import NoPage from './Pages/NoPage'
import DetailsPage from './Pages/DetailsPage';
import { HashRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <HashRouter>
      <Routes>
        <Route>
          <Route exact path='/' element={<App />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
ReactDOM.render(<Index />, document.getElementById("root"));
