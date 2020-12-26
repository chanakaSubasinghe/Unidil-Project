import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteBag, readAllBags } from '../../services/Bag';

function ReadAllBags() {

    async function fetchData() {
        const response = await readAllBags();

        if (response.status === 200) {
            setBags(response.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [bags, setBags] = useState([]);

    const onDelete = async (id) => {
        await deleteBag(id);
        fetchData();
    };

    return (
        <div>
            <h1 className="text-center my-5">All Bags</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Width</th>
                        <th scope="col">Length</th>
                        <th scope="col">Fold Price</th>
                        <th scope="col">Paste Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bags.map((bag) => {
                        return (
                            <tr key={bag._id}>
                                <td>{bag.name}</td>
                                <td>{bag.width}</td>
                                <td>{bag.length}</td>
                                <td>{bag.foldPrice}</td>
                                <td>{bag.pastePrice}</td>
                                <td>
                                    <div className="row">
                                        <Link className="col-xs-6 btn btn-primary btn-sm mx-1 disabled" to={`/edit/${bag._id}`}>Edit</Link>
                                        <Link className="col-xs-6 btn btn-danger btn-sm" to="#" onClick={() => onDelete(bag._id)}>Delete</Link>
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

export default ReadAllBags;
