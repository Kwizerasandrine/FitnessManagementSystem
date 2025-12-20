import React from 'react';
import './ConfirmationModal.css';
import Button from './Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", confirmVariant = "danger" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content confirmation-modal">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={confirmVariant} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
