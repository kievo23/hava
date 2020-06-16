import React, {useState} from 'react';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import logo from './logo.svg';


//custom styling
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import './css/App.css';

//App Components
import Search from './components/Search';
import Trips from './components/Trips';
import Trip from './components/Trip';
import Sidebar from './layouts/Sidebar';


function App() {
  const [menuShowing, setMenuShowing] = useState(true)
    //console.log(document.getElementsByClassName("sidebar"))
    function showMenu(){
        setMenuShowing(!menuShowing)
    }
    function hideMenu(){
        setMenuShowing(!menuShowing)
    }
  return (
    <BrowserRouter>
      <div className={`App ${menuShowing ? "" : "condensed"}`}>
        <Sidebar />
        <div className="main">
          <div className="navbar" >
              {menuShowing ? (
                      <i className="material-icons show-icons-only" onClick={hideMenu}>menu</i>
              ) : (
                      <i className="material-icons show-menu" onClick={showMenu}>east</i>
              ) } 
          </div>
          <Route exact path="/" component={Search}></Route>
          <Route exact path="/trips" component={Trips}></Route>
          <Route exact path="/trip" component={Trip}></Route>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
