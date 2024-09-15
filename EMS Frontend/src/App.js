import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import EmployeeManagementApp from './components/EmployeeManagement'
import EmployeeDetailsApp from './components/Employeedetails';
import AddEmployeeForm from './components/Addemployee';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element ={<Navigate to ="employee"/>}/>
        <Route path ="/employee" element ={<EmployeeManagementApp/>}/>
        <Route path ="/employee/:id" element ={<EmployeeDetailsApp/>}/>
        <Route path ="/new_employee" element ={<AddEmployeeForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
