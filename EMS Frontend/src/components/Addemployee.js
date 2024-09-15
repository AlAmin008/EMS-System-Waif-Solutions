import React, { useState } from 'react';
import SideBarApp from './Sidebar';
import { AddEmployee } from '../api';
import Footer from './Footer';


function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();

            img.onload = function () {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                
                canvas.toBlob(
                    function (blob) {
                        if (blob) {
                            resolve(blob); 
                        } else {
                            reject(new Error('Image resizing failed.'));
                        }
                    },
                    file.type
                );
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}


const AddEmployeeForm = () => {
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        profile_picture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployeeData({ ...employeeData, profile_picture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const fullName = `${employeeData.firstName} ${employeeData.lastName}`;
        formData.append('name', fullName);
        formData.append('email', employeeData.email);
        formData.append('phone', employeeData.phone);
        formData.append('birthday', employeeData.birthday);
        if (employeeData.profile_picture) {
            const resizedBlob = await resizeImage(employeeData.profile_picture, 100, 100);
            const resizedFile = new File([resizedBlob], employeeData.profile_picture.name, { type: employeeData.profile_picture.type });
            formData.append('profile_picture', resizedFile);
        }
    
        try {
            const response = await AddEmployee(formData);

            if (response.status === 201) {
                const data = await response.json();
                alert('Employee added successfully!');
                setEmployeeData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    birthday: '',
                    profile_picture: null,
                });
            } else {
                alert('Failed to add employee.');
            }
        } catch (error) {
            alert('An error occurred while adding the employee.',error);
        }
    };

    return (
        <div className="row" style={{height:'100%'}}>
            <div className="col-md-3 col-lg-2 border-end">
                <SideBarApp />
            </div>
            <div className="col-md-9 col-lg-10 p-5">
            <h3 className="mb-4 text-center">Add Employee</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={employeeData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={employeeData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={employeeData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={employeeData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthday"
                        name="birthday"
                        value={employeeData.birthday}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="profile_picture" className="form-label">Profile Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profile_picture"
                        name="profile_picture"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {employeeData.profile_picture && (
                        <img
                            src={URL.createObjectURL(employeeData.profile_picture)}
                            alt="Profile Preview"
                            className="img-fluid mt-2"
                            style={{ maxWidth: '150px' }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
        </div>
        <Footer/>
       </div> 
    );
};

export default AddEmployeeForm;
