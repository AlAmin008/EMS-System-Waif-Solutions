import React, { useState } from "react";

function EmployeeSearchApp({onSearch}){
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ name, birthday, email, phone });
        setName('');
        setBirthday('');
        setEmail('');
        setPhone('');
    };

    return (
    <div className="d-flex column border p-4 mt-2 rounded">
        <form onSubmit={handleSubmit} className="d-flex flex-row gap-3">
            <input type="text" className="form-control me-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="date" className="form-control me-3" value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
            <input type="text" className="form-control me-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="tel" className="form-control me-3" placeholder="Mobile" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            <button type="submit" className="btn btn-primary">
                <i className="bi bi-search"></i>
            </button>
        </form>
    </div>

    )
}
export default EmployeeSearchApp;