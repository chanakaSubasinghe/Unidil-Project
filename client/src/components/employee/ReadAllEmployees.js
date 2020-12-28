import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee, readAllEmployees } from '../../services/Employee';

function ReadAllEmployees() {

    async function fetchData() {
        const response = await readAllEmployees();

        if (response.status === 200) {
            setEmployees(response.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [employees, setEmployees] = useState([]);

    const onDelete = async (id) => {
        await deleteEmployee(id);
        fetchData();
    };

    return (
        <div>
            <h1 className="text-center my-5">All Employees</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => {
                        return (
                            <tr key={employee._id}>
                                <td>{employee.fullName}</td>
                                <td>{employee.contactNumber}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <div className="row">
                                        <Link className="col-xs-6 btn btn-primary btn-sm mx-1 disabled" to={`/edit/${employee._id}`}>Edit</Link>
                                        <Link className="col-xs-6 btn btn-danger btn-sm" to="#" onClick={() => onDelete(employee._id)}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ReadAllEmployees;
