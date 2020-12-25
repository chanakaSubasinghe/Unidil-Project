import React from 'react';

function AddRecord() {
    return (
        <div>
            <h1 className="text-center my-5">Add Record</h1>

            <form>
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Bag</label>
                    <div className="col-sm-10">
                        <select class="custom-select mr-sm-2">
                            <option selected>Choose...</option>
                            <option value="pasting">Pasting</option>
                            <option value="folding">Folding</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label className="col-sm-2 col-form-label">Employee</label>
                    <div className="col-sm-10">
                        <select class="custom-select mr-sm-2">
                            <option selected>Choose...</option>
                            <option value="pasting">Pasting</option>
                            <option value="folding">Folding</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Total Pasted Bags</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="100" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Total Folded Bags</label>
                    <div className="col-sm-10">
                        <input type="tel" className="form-control" placeholder="40" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 text-center">
                        <button type="submit" className="btn btn-primary">Create Record</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddRecord;
