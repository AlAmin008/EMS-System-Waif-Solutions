import React from "react";

function ConfirmActionApp({ showModal, setShowModal, id , onDelete}) {
    const handleClose = () => {
        setShowModal(false);
    };

    
    const handleDelete = () => {
        if (id) {
            onDelete(id);
        }
    };
    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} role='dialog' style={{
            display: showModal ? 'block' : 'none',
        }}>
            <div className="modal-dialog modal-dialog-centered" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> “Are you sure, you want to delete this?</h5>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>No</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmActionApp;
