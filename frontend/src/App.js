import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from 'react';
import { useLocalState } from './util/useLocalStorage';
import PrivateRoute from './PrivateRoute';
import Homepage from './Homepage';

function App() {



  return (
    <Router>
    <Routes >
      <Route path="/" element={
      <PrivateRoute>
        <Homepage/>
      </PrivateRoute>} />
      <Route path='login' element={<Login/>}/>
    </Routes>
    </Router>

  );
}

export default App;
