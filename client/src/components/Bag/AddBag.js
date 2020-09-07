import React, { useState } from 'react';

function AddBag() {

    // state
    const [bag, setBag] = useState({
        name: "",
        width: 0,
        height: 0,
        foldPrice: 0,
        pastePrice: 0
    });

    return (
        <div>
            <h1>Add Bag</h1>
            <form>
                <div class="form-group">
                    <label>Bag Name</label>
                    <input type="text" className="form-control" placeholder="Tea Bag" maxLength="30" required />
                </div>

                <div class="form-group">
                    <label>Bag Width</label>
                    <input type="number" className="form-control" placeholder="9" max="100" required />
                </div>

                <div class="form-group">
                    <label>Bag Height</label>
                    <input type="number" className="form-control" placeholder="4" max="100" required />
                </div>


                <div class="form-group">
                    <label>Fold Price</label>
                    <input type="number" className="form-control" placeholder="Tea Bag" maxLength="30" required />
                </div>

                <div class="form-group">
                    <label>Paste Price</label>
                    <input type="number" className="form-control" placeholder="Tea Bag" maxLength="30" required />
                </div>

                <button type="submit" className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddBag;

