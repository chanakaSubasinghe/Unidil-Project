import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { createBag } from '../../services/Bag';
import { Link } from 'react-router-dom';

function AddBag() {

    const [bag, setBag] = useState({
        name: "",
        width: "",
        length: "",
        foldPrice: "",
        pastePrice: ""
    });

    const [visibleAlert, setVisibleAlert] = useState({
        status: false,
        type: "",
        message: ""
    });

    const formValidations = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Bag name is required!";
        }

        if (!values.width) {
            errors.width = "Width is required!";
        }

        if (!values.length) {
            errors.length = "Length is required!";
        }

        if (!values.foldPrice) {
            errors.foldPrice = "Fold price is required!";
        }

        if (!values.pastePrice) {
            errors.pastePrice = "Paste Price is required!";
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
        const response = await createBag(values);

        if (response.status === 201) {
            setBag({
                name: "",
                width: "",
                length: "",
                foldPrice: "",
                pastePrice: ""
            });

            handleVisible("success", "successfully created");
        } else if (response.status === 400 && response.data === 'bag name must be unique') {
            handleVisible("danger", "bag name must be unique");
        } else {
            handleVisible("danger", response.data);
        }
    };

    return (
        <div>

            <h1 className="text-center my-5">Add Bag</h1>

            {visibleAlert.status &&
                <div className={`alert alert-${visibleAlert.type} alert-dismissible fade show my-4`} role="alert">
                    {visibleAlert.message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }

            <Formik
                initialValues={bag}
                validate={formValidations}
                onSubmit={formSubmit}
            >
                <Form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Bag Name</label>
                        <div className="col-sm-10">
                            <Field type="text" className="form-control" name="name" placeholder="Cement Bag" />
                            <ErrorMessage className="text-danger" name="name" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Bag Width (mm)</label>
                        <div className="col-sm-10">
                            <Field type="number" className="form-control" name="width" placeholder="420" />
                            <ErrorMessage className="text-danger" name="width" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Bag Length (mm)</label>
                        <div className="col-sm-10">
                            <Field type="number" className="form-control" name="length" placeholder="1080" />
                            <ErrorMessage className="text-danger" name="length" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Fold Price (Rs.)</label>
                        <div className="col-sm-10">
                            <Field type="number" className="form-control" name="foldPrice" placeholder="5" min="0" step="0.01" />
                            <ErrorMessage className="text-danger" name="foldPrice" component="div" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Paste Price (Rs.)</label>
                        <div className="col-sm-10">
                            <Field type="number" className="form-control" name="pastePrice" placeholder="3.40" min="0" step="0.01" />
                            <ErrorMessage className="text-danger" name="pastePrice" component="div" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10 text-center">
                            <button type="submit" className="btn btn-primary">Create Bag</button>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Link className="btn btn-info float-right mb-5" to="/read-all-bags">All Bags</Link>
        </div>
    );
}

export default AddBag;
