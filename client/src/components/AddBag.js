import React from 'react';

function AddBag() {
    return (
        <div>
            <h1 className="text-center my-5">Add Bag</h1>

            <form>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Bag Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="Cement Bag" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Bag Width (inch)</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="7" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Bag Height (inch)</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="12" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Fold Price (Rs.)</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="5" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Paste Price (Rs.)</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" placeholder="3.40" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10 text-center">
                        <button type="submit" className="btn btn-primary">Create Bag</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddBag;
