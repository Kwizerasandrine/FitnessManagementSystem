import React from 'react';
import './AlertModal.css';
import Button from './Button';

const AlertModal = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'success',
    showCancel = false,
    onConfirm = null,
    confirmText = 'Yes',
    cancelText = 'Cancel'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'info': return 'ℹ️';
            case 'warning': return '⚠️';
            default: return '📢';
        }
    };

    return (
        <div className="alert-modal-overlay">
            <div className={`alert-modal-content ${type}`}>
                <div className="alert-modal-header">
                    <span className="alert-icon">{getIcon()}</span>
                    <h3>{title}</h3>
                </div>
                <div className="alert-modal-body">
                    <p>{message}</p>
                </div>
                <div className="alert-modal-footer">
                    {showCancel && (
                        <Button variant="secondary" onClick={onClose}>
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        variant={type === 'error' || type === 'warning' ? 'danger' : 'primary'}
                        onClick={onConfirm || onClose}
                    >
                        {showCancel ? confirmText : 'OK'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
