import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import LocationSelector from '../../components/common/LocationSelector';
import memberService from '../../services/member.service';
import AlertModal from '../../components/common/AlertModal';
import './AddMember.css';

const AddMember = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        completeName: '',
        email: '',
        password: '',
        contact: '',
        role: 'user',
        age: '',
        height: '',
        weight: '',
        gender: '1',
        locationId: null
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

    const handleLocationChange = (locationId) => {
        setFormData(prev => ({
            ...prev,
            locationId: locationId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.locationId) {
            showAlert('Error', 'Please select a complete location (up to village level)', 'error');
            return;
        }

        try {
            setLoading(true);
            await memberService.createMember(formData);
            showAlert('Success', 'Member created successfully!', 'success', () => {
                history.push('/members');
            });
        } catch (error) {
            console.error('Error creating member:', error);
            showAlert('Error', 'Failed to create member: ' + (error.response?.data?.message || error.message), 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-member-page">
                <div className="page-header">
                    <h1>➕ Add New Member</h1>
                    <Button onClick={() => history.push('/members')} variant="secondary">
                        ← Back to List
                    </Button>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3>Personal Information</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        name="completeName"
                                        value={formData.completeName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter email address"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter password"
                                        minLength="6"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Contact Number *</label>
                                    <input
                                        type="tel"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter contact number"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Role *</label>
                                    <select name="role" value={formData.role} onChange={handleChange} required>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="trainer">Trainer</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Gender *</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Physical Information</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        max="120"
                                        placeholder="Enter age"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        step="0.1"
                                        placeholder="Enter height in cm"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        step="0.1"
                                        placeholder="Enter weight in kg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Location Information *</h3>
                            <LocationSelector
                                value={formData.locationId}
                                onChange={handleLocationChange}
                                required={true}
                                label="Select Location (Province → District → Sector → Cell → Village)"
                            />
                        </div>

                        <div className="form-actions">
                            <Button type="button" variant="secondary" onClick={() => history.push('/members')}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Member'}
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

export default AddMember;
