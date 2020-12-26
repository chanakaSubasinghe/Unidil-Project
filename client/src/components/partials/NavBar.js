import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Dashboard</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <div className="navbar-nav form-inline my-2 my-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/add-bag">Add Bag</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/add-employee">Add Employee</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/add-record">Add Record</Link>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
