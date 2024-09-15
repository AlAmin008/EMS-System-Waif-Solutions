export const BASE_URL = 'http://localhost:8000/'
export const GetAllEmployees = async(currentPage = 1, limit =6,sort_by='employee_id',order_by='asc',searchParams={}) => {
    const offset = (currentPage - 1) * limit;
    const queryParams = new URLSearchParams({
        sort_by,
        order_by,
        limit,
        page: currentPage,
        offset,
        ...searchParams
    }).toString();
    const url =`${BASE_URL}api/employees/?${queryParams}`
    try{
        const options = {
            method : 'GET',
            'Content-Type':'application/json'
        }
        const result = await fetch(url,options);
        const data = await result.json();
        return data
    }catch(err){
        return err;
    }
}

export const GetEmployeeDetail = async(id) => {
    const url =`${BASE_URL}api/employee/${id}/`
    try{
        const options = {
            method : 'GET',
            'Content-Type':'application/json'
        }
        const result = await fetch(url,options);
        const data = await result.json();
        return data
    }catch(err){
        return err;
    }
}

export const AddEmployee = async(formData) => {
    const url =`${BASE_URL}api/employee/`
    try {
        const options = {
            method: 'POST',
            body: formData  
        }
        const result = await fetch(url, options);
        return result;
    }catch(err){
        return err;
    }
}

export const UpdateEmployeeDetails = async(id,formData)=>{
    const url =`${BASE_URL}api/employee/${id}/`
    try {
        const options = {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(formData) 
        };
        const result = await fetch(url, options);
        return result;
    } catch (err) {
        console.error('Error:', err);
        return err;
    }
}

export const DeleteEmployee = async(id)=>{
    const url =`${BASE_URL}api/employee/${id}/`
    try {
        const options = {
            method: 'DELETE', 
        };
        const result = await fetch(url, options);
        return result;
    } catch (err) {
        console.error('Error:', err);
        return err;
    }
}