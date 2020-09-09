import React, { useState } from 'react';
import axios from 'axios';
import Response from '../Response';

function AddBag() {

    // state
    const [bag, setBag] = useState({
        name: "",
        width: "",
        height: "",
        foldPrice: "",
        pastePrice: ""
    });

    const [response, setResponse] = useState({
        status: false,
        message: "",
        alertType: ""
    });

    function handleChange(event) {

        const { name, value } = event.target;

        setBag((prevValues) => {
            return {
                ...prevValues,
                [name]: value
            };
        });
    }


    async function onSubmit(event) {

        event.preventDefault();

        try {
            const newBag = await axios.post('/api/bags', bag);

            if (newBag) {
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
            <h1 className="text-center my-5">Add Bag</h1>

            {response.status &&
                <Response message={response.message} alertType={response.alertType} onClose={() => setResponse({ status: !response.status })} />
            }

            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label>Bag Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Tea Bag" maxLength="30" value={bag.name} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Bag Width</label>
                    <input type="number" className="form-control" name="width" placeholder="9" max="100" value={bag.width} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Bag Height</label>
                    <input type="number" className="form-control" name="height" placeholder="4" max="100" value={bag.height} onChange={handleChange} required />
                </div>


                <div class="form-group">
                    <label>Fold Price (Rs.)</label>
                    <input type="number" className="form-control" name="foldPrice" placeholder="2.75" maxLength="30" value={bag.foldPrice} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Paste Price (Rs.)</label>
                    <input type="number" className="form-control" name="pastePrice" placeholder="1.50" maxLength="30" value={bag.pastePrice} onChange={handleChange} required />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddBag;

