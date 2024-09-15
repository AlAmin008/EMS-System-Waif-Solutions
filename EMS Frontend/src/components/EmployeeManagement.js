import React, { useEffect, useState } from "react";
import EmployeeTableApp from "./EmployeeTable";
import EmployeeSearchApp from "./EmployeeSearch";
import SideBarApp from "./Sidebar";
import Footer from './Footer';


function EmployeeManagementApp(){
    const [searchParams, setSearchParams] = useState({ name: '', email: '', phone: '', birthday: '' });

    const handleSearch = (params) => {
        setSearchParams(params);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="row flex-grow-1">
                <div className="col-md-5 col-lg-2 border-end">
                    <SideBarApp />
                </div>
                <div className="col-md-7 col-lg-10">
                    <div className="container d-flex flex-column align-items-center my-4">
                        <EmployeeSearchApp onSearch={handleSearch} />
                        <EmployeeTableApp searchParams={searchParams} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
    
}
export default EmployeeManagementApp