import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import locationService from '../../services/location.service';
import AlertModal from '../../components/common/AlertModal';
import '../Members/AddMember.css';

const AddLocation = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        locationType: 'PROVINCE',
        parentId: ''
    });

    // Alert Modal State
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onClose: () => { }
    });

    const showAlert = (title, message, type, onClose = null) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onClose || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            name: formData.name,
            code: formData.code,
            locationType: formData.locationType,
            parentId: formData.parentId ? parseInt(formData.parentId) : null
        };

        try {
            setLoading(true);
            await locationService.createLocation(dataToSend);
            showAlert('Success', 'Location created successfully!', 'success', () => {
                history.push('/locations');
            });
        } catch (error) {
            console.error('Error creating location:', error);
            showAlert('Error', 'Failed to create location: ' + (error.response?.data?.message || error.message), 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-member-page">
                <div className="page-header">
                    <h1>➕ Add New Location</h1>
                    <Button onClick={() => history.push('/locations')} variant="secondary">
                        ← Back to List
                    </Button>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Location Information</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Location Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter location name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Location Code *</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter unique code"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Location Type *</label>
                                    <select name="locationType" value={formData.locationType} onChange={handleChange} required>
                                        <option value="PROVINCE">Province</option>
                                        <option value="DISTRICT">District</option>
                                        <option value="SECTOR">Sector</option>
                                        <option value="CELL">Cell</option>
                                        <option value="VILLAGE">Village</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Parent Location ID</label>
                                    <input
                                        type="number"
                                        name="parentId"
                                        value={formData.parentId}
                                        onChange={handleChange}
                                        placeholder="Leave empty for Province"
                                    />
                                    <small style={{ color: '#666', marginTop: '5px' }}>
                                        Leave empty for Province level
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button type="button" variant="secondary" onClick={() => history.push('/locations')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Location'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <AlertModal
                isOpen={alertState.isOpen}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
                onClose={alertState.onClose}
            />
        </MainLayout>
    );
};

export default AddLocation;
