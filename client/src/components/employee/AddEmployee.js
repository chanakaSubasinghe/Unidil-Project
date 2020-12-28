import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { createEmployee } from '../../services/Employee';
import { Link } from 'react-router-dom';

function AddEmployee() {

    const [employee, setEmployee] = useState({
        fullName: "",
        contactNumber: "",
        role: "",
        startDate: ""
    });

    const [visibleAlert, setVisibleAlert] = useState({
        status: false,
        type: "",
        message: ""
    });

    const formValidations = (values) => {
        const errors = {};

        if (!values.fullName) {
            errors.fullName = "Full name is required!";
        }

        if (!values.contactNumber) {
            errors.contactNumber = "Contact number is required!";
        }

        if (values.contactNumber.length !== 10) {
            errors.contactNumber = "Contact number should be 10 digit number!";
        }

        if (!values.role) {
            errors.role = "Role is required!";
        }

        if (!values.startDate) {
            errors.startDate = "Start date is required!";
        }

        return errors;
    };

    const handleVisible = (type, message) => {
        setVisibleAlert({
            status: true,
            type,
            message
        });
        setTimeout(() => {
            setVisibleAlert({
                status: false,
                type: "",
                message: ""
            });
        }, 5000);
    };

    const formSubmit = async (values) => {
        const response = await createEmployee(values);
        console.log(response);
        if (response.status === 201) {
            setEmployee({
                fullName: "",
                contactNumber: "",
                role: "",
                startDate: ""
            });

            handleVisible("success", "successfully created");
        } else if (response.status === 400 && response.data === 'full name and contact number must be unique') {
            handleVisible("danger", "full name and contact number must be unique");
        } else {
            handleVisible("danger", response.data);
        }
    };
    return (
        <div>
            <h1 className="text-center my-5">Add Employee</h1>

            {visibleAlert.status &&
                <div className={`alert alert-${visibleAlert.type} alert-dismissible fade show my-4`} role="alert">
                    {visibleAlert.message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }

            <Formik
                initialValues={employee}
                validate={formValidations}
                onSubmit={formSubmit}
            >
                <Form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-10">
                            <Field type="text" className="form-control" name="fullName" placeholder="Nayana Rajapakshe" />
                            <ErrorMessage className="text-danger" name="fullName" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Contact Number</label>
                        <div className="col-sm-10">
                            <Field type="tel" className="form-control" name="contactNumber" placeholder="0771234567" />
                            <ErrorMessage className="text-danger" name="contactNumber" component="div" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                            <Field as="select" class="custom-select mr-sm-2" name="role">
                                <option selected>Choose...</option>
                                <option value="pasting">Pasting</option>
                                <option value="folding">Folding</option>
                            </Field>
                            <ErrorMessage className="text-danger" name="role" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="inputEmail3" className="col-sm-2 col-form-label">Start Date</label>
                        <div className="col-sm-10">
                            <Field type="date" className="form-control" name="startDate" />
                            <ErrorMessage className="text-danger" name="startDate" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10 text-center">
                            <button type="submit" className="btn btn-primary">Create Employee</button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Link className="btn btn-info float-right mb-5" to="/read-all-employees">All Employees</Link>
        </div>
    );
}

export default AddEmployee;
