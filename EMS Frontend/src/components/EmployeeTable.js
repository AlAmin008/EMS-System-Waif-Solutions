import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { DeleteEmployee, GetAllEmployees } from "../api";
import ConfirmActionApp from "./ConfirmAction";
import { BASE_URL } from "../api";

function EmployeeTableApp({onSort,searchParams}){
    const [showModal,setShowModal] = useState(false)
    const [employees, setEmployees] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit,setLimit] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);


    const fetchEmployees = async() => {
        const { key: sort_by, direction: order_by } = sortConfig;
        try {
            const data = await GetAllEmployees(currentPage, limit, sort_by, order_by,searchParams);
            if (data){
                setEmployees(data.results || []); 
                setTotalItems(data.count || 0); 
                setTotalPages(Math.ceil((data.count || 0) / limit));
            } 
        } catch (err) {
            console.log('Error', err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [currentPage, sortConfig,searchParams]);


    const handleSort = (field) => {
        const direction = (sortConfig.key === field && sortConfig.direction === 'asc') ? 'desc' : 'asc';
        setSortConfig({ key: field, direction });
        setCurrentPage(1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const getSortIcon = (field) => {
        if (sortConfig.key === field) {
            return sortConfig.direction === 'asc' ? 'bi-arrow-down' : 'bi-arrow-up';
        }
        return 'bi-arrow-down-up'; 
    };

    const handleDelete = async (id) => {
        try {
            const result = await DeleteEmployee(id);
            if (result.ok) {
                alert('Employee deleted successfully!');
                setShowModal(false);
                fetchEmployees(); 
            } else {
                console.error('Failed to delete employee:', result);
                alert('Failed to delete employee.');
            }
        } catch (err) {
            console.error('Error deleting employee:', err);
            alert('Error deleting employee.');
        }
    };


    const TableRow = ({employee}) =>{
        return <tr>
            <td><img src={`${BASE_URL}${employee.profile_picture}`} alt="Profile Image"/></td>
                                <td >{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.birthday}</td>
                                <td >
                                    <Link to={`/employee/${employee.employee_id}`} className="btn btn-info btn-sm me-2"><i className="bi bi-pencil-square"></i></Link>
                                    <a href="#" className="btn btn-danger btn-sm" onClick={() => { setEmployeeIdToDelete(employee.employee_id); setShowModal(true); }} ><i className="bi bi-trash"></i></a>
                                </td>
        </tr>
    }
    return (
        <div className="container mt-5">
                    <table className="table align-middle table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Full Name
                                <button type="button" onClick={() => handleSort('name')} style={{ border: 'none', background: 'none' }}
                                ><i className={`bi ${getSortIcon('name')}`}></i></button>
                                </th>
                                <th>Email
                                <button type="button" onClick={() => handleSort('email')} style={{ border: 'none', background: 'none' }}
                                ><i className={`bi ${getSortIcon('email')}`}></i></button>
                                </th>
                                <th>Mobile
                                <button type="button" onClick={() => handleSort('phone')} style={{ border: 'none', background: 'none' }}
                                ><i className={`bi ${getSortIcon('phone')}`}></i></button>
                                </th>
                                <th>Date of Birth
                                <button type="button" onClick={() => handleSort('birthday')} style={{ border: 'none', background: 'none' }}
                                ><i className={`bi ${getSortIcon('birthday')}`}></i></button>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <TableRow key={emp.employee_id} employee={emp} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                    </tbody>
                        
                    <tfoot>
                        <tr>
                            <td colSpan="6">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Showing {((currentPage - 1) * limit)+1} to {Math.min(currentPage * limit, totalItems)} out of {totalItems} </span>
                                    <nav aria-label="Table pagination">
                                        <ul className="pagination">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>&laquo;</button>
                                            </li>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => handlePageClick(index + 1)}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>&raquo;</button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                        
                    </table>
                    <ConfirmActionApp showModal={showModal} 
                setShowModal={setShowModal} 
                onDelete={handleDelete} 
                id={employeeIdToDelete}/>
                </div>
    )
}
export default EmployeeTableApp