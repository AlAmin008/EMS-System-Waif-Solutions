import React from "react";
import { Link } from 'react-router-dom';

function SideBarApp() {
    return (
        <nav className="col-md-5 col-lg-4 d-md-block sidebar mt-4" style={{ backgroundColor: 'transparent', color: 'black' }}>
    <Link to={`/`} className="btn btn-sm d-flex align-items-center" style={{ color: 'black', width: '260%' }}>
        <i className="bi bi-house-door me-2"></i> Home
    </Link>
    <Link to={`/employee`} className="btn btn-sm d-flex align-items-center" style={{ color: 'black', width: '260%' }}>
        <i className="bi bi-person me-2"></i> Employees
    </Link>
    <Link to={`/new_employee`} className="btn btn-sm d-flex align-items-center" style={{ color: 'black', width: '260%' }}>
        <i className="bi bi-person-add me-2"></i> Add Employees
    </Link>
</nav>

    );
}

export default SideBarApp;
