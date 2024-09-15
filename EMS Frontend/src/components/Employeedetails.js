import React, { useEffect, useState } from "react";
import { GetEmployeeDetail, UpdateEmployeeDetails } from "../api";
import SideBarApp from "./Sidebar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../api";

function EmployeeDetailsApp({employee}){
    const { id } = useParams();
    const [editableEmployee, setEditableEmployee] = useState([]);
    const [originalEmployee, setOriginalEmployee] = useState({});

    const fetchEmployeeDetail = async(id)=>{
        try{
            const data = await GetEmployeeDetail(id);
            setOriginalEmployee(data)
            setEditableEmployee(data)
        }
        catch(err){
            console.log('Error',err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFields = {};
            for (const key in editableEmployee) {
                if (editableEmployee[key] !== originalEmployee[key]) {
                    updatedFields[key] = editableEmployee[key];
                }
            }
            const response = await UpdateEmployeeDetails(id, updatedFields);
            if(response.ok){
                console.log(response)
                alert('Employee details updated successfully!');
            }
            else{
                const errorData = await response.json();
                console.log('Update failed:', errorData);
            }
            
        } catch (err) {
            console.log('Error updating employee details:', err);
        }
    };

    useEffect(() => {
        fetchEmployeeDetail(id);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="row flex-grow-1">
                <div className="col-md-3 col-lg-2 border-end">
                    <SideBarApp />
                </div>
                <div className="col-md-9 col-lg-10">
                    <div className="container mt-4">
                        <h1 className="mb-4 text-center">
                            <img src={`${BASE_URL}${editableEmployee.profile_picture}`} alt="Profile Image" />
                        </h1>
                        <form onSubmit={handleSubmit} className="me-3">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={editableEmployee.name || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={editableEmployee.email || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={editableEmployee.phone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthday" className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthday"
                                    name="birthday"
                                    value={editableEmployee.birthday || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default EmployeeDetailsApp;