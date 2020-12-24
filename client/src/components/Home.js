import React from 'react';

import packaging from '../assets/packaging.jpg';

function Home() {
    return (
        <div>
            <h1 className="text-center mt-5">Uni-Dil Packaging Limited</h1>

            <div className="text-center my-5">
                <img src={packaging} className="img-fluid" alt="Responsive image" width="50%"></img>
            </div>
        </div>
    );
}

export default Home;
