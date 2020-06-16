import React from 'react'
import {NavLink} from 'react-router-dom';

function Sidebar(props){
    console.log('props')
    console.log(props.menuShowing)
    return (
        <div className={`sidebar ${props.menuShowing ? "" : "condensed"}`}>
            <div className="navbar">
                <i className="material-icons">home_work</i>
                <p className="brandName">Hava</p>
            </div>
            <div className="column">
                <NavLink exact to="/">
                    <span>
                        <i className="material-icons">tour</i><span className="text">Dashboard</span>
                    </span>
                </NavLink>
                <NavLink exact to="/trips">
                    <span>
                        <i className="material-icons">tab</i><span className="text">Trips</span>
                    </span>
                </NavLink>
                <NavLink exact to="/account">
                    <span>
                        <i className="material-icons">translate</i><span className="text">Account</span>
                    </span>
                </NavLink>
                <NavLink exact to="/reports">
                    <span>
                        <i className="material-icons">update</i><span className="text">Reports</span>
                    </span>
                </NavLink>
            </div>  
        </div>
    )
}

export default Sidebar;