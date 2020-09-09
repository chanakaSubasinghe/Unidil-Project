import React, { useState } from 'react';

import axios from 'axios';

import Response from '../Response';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function AddEmployee() {

    // state
    const [employee, setEmployee] = useState({
        fullName: "",
        role: "",
        startDate: new Date(),
        contactNumber: "",
        supervisor: ""
    });

    const [response, setResponse] = useState({
        status: false,
        message: "",
        alertType: ""
    });

    function handleChange(event) {

        const { name, value } = event.target;
        console.log(name, value);
        setEmployee((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    }


    async function onSubmit(event) {

        event.preventDefault();

        try {
            const newEmployee = await axios.post('/api/employees', employee);

            if (newEmployee) {
                setResponse({
                    status: true,
                    message: 'Successfully added.',
                    alertType: 'success'
                });
            }



        } catch (error) {

            const errorResponse = error.response.data;

            if (errorResponse.code === 11000) {
                setResponse({
                    status: true,
                    message: `${errorResponse.keyValue.name} already exist! please add a different bag name :)`,
                    alertType: 'danger'
                });
            } else {
                setResponse({
                    status: true,
                    message: 'Something went wrong!',
                    alertType: 'danger'
                });
            }
            console.log(error.response);
        }

    }

    return (
        <div>
            <h1 className="text-center my-5">Add Employee</h1>

            {response.status &&
                <Response message={response.message} alertType={response.alertType} onClose={() => setResponse({ status: !response.status })} />
            }

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Ruvandi Munasinghe"
                        maxLength="30" value={employee.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>



                <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;

