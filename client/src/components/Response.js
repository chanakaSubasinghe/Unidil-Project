import React from 'react';

function Response({ message, alertType, onClose }) {
    return (
        <div>
            <div className={`alert alert-${alertType} alert-dismissible fade show my-5`} role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}

export default Response;
