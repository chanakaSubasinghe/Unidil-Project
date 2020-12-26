import React from 'react';

function AddEmployee() {
    return (
        <div>
            <h1 className="text-center my-5">Add Employee</h1>

            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Full Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Nayana Rajapakshe" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Contact Number</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" placeholder="0771234567" />
                    </div>
                </div>
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <select class="custom-select mr-sm-2">
                            <option selected>Choose...</option>
                            <option value="pasting">Pasting</option>
                            <option value="folding">Folding</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Start Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 text-center">
                        <button type="submit" className="btn btn-primary">Create Employee</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
