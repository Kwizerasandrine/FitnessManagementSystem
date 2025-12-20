import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import trainerService from '../../services/trainer.service';
import AlertModal from '../../components/common/AlertModal';
import './AddTrainer.css';

const AddTrainer = () => {
    const history = useHistory();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        trainerName: '',
        contact: '',
        address: '',
        salary: '',
        joinDate: '',
        avatar: ''
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Alert Modal State
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onClose: () => { }
    });

    const showAlert = React.useCallback((title, message, type, onClose = null) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onClose || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    }, []);

    const loadTrainer = React.useCallback(async () => {
        try {
            setLoading(true);
            // Note: Backend doesn't have a single trainer endpoint, 
            // so we'll need to get all trainers and filter
            const response = await trainerService.getAllTrainers();
            const trainersData = response.data || response || [];
            const trainer = trainersData.find(t => t.id === parseInt(id));

            if (trainer) {
                setFormData({
                    trainerName: trainer.trainerName || '',
                    contact: trainer.contact || '',
                    address: trainer.address || '',
                    salary: trainer.salary || '',
                    joinDate: trainer.joinDate || '',
                    avatar: trainer.avatar || ''
                });
            }
        } catch (error) {
            console.error('Error loading trainer:', error);
            showAlert('Error', 'Failed to load trainer details', 'error');
        } finally {
            setLoading(false);
        }
    }, [id, showAlert]);

    useEffect(() => {
        if (isEditMode) {
            loadTrainer();
        }
    }, [isEditMode, loadTrainer, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.trainerName.trim()) {
            newErrors.trainerName = 'Trainer name is required';
        }

        if (!formData.contact.trim()) {
            newErrors.contact = 'Contact is required';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.salary || formData.salary <= 0) {
            newErrors.salary = 'Salary must be greater than 0';
        }

        if (!formData.joinDate) {
            newErrors.joinDate = 'Join date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const trainerData = {
                ...formData,
                salary: parseFloat(formData.salary)
            };

            if (isEditMode) {
                trainerData.id = parseInt(id);
                await trainerService.updateTrainer(trainerData);

                // Upload avatar if a new file was selected
                if (avatarFile) {
                    await trainerService.uploadTrainerImage(id, avatarFile);
                }

                showAlert('Success', 'Trainer updated successfully', 'success', () => {
                    history.push('/trainers');
                });
            } else {
                const response = await trainerService.createTrainer(trainerData);

                // Upload avatar if file was selected
                if (avatarFile && response.data?.id) {
                    await trainerService.uploadTrainerImage(response.data.id, avatarFile);
                }

                showAlert('Success', 'Trainer created successfully', 'success', () => {
                    history.push('/trainers');
                });
            }
        } catch (error) {
            console.error('Error saving trainer:', error);
            showAlert('Error', 'Failed to save trainer', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-trainer-page">
                <div className="page-header">
                    <h1>{isEditMode ? '✏️ Edit Trainer' : '➕ Add New Trainer'}</h1>
                    <Button onClick={() => history.push('/trainers')} variant="secondary">
                        ← Back to Trainers
                    </Button>
                </div>

                <div className="page-content">
                    <form onSubmit={handleSubmit} className="trainer-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="trainerName">
                                    Trainer Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="trainerName"
                                    name="trainerName"
                                    value={formData.trainerName}
                                    onChange={handleChange}
                                    className={errors.trainerName ? 'error' : ''}
                                    placeholder="e.g., John Doe"
                                />
                                {errors.trainerName && (
                                    <span className="error-message">{errors.trainerName}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="contact">
                                    Contact <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className={errors.contact ? 'error' : ''}
                                    placeholder="e.g., +1234567890"
                                />
                                {errors.contact && (
                                    <span className="error-message">{errors.contact}</span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="address">
                                    Address <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={errors.address ? 'error' : ''}
                                    placeholder="e.g., 123 Main St, City"
                                />
                                {errors.address && (
                                    <span className="error-message">{errors.address}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">
                                    Salary ($) <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className={errors.salary ? 'error' : ''}
                                    placeholder="e.g., 5000"
                                    step="0.01"
                                    min="0"
                                />
                                {errors.salary && (
                                    <span className="error-message">{errors.salary}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="joinDate">
                                    Join Date <span className="required">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="joinDate"
                                    name="joinDate"
                                    value={formData.joinDate}
                                    onChange={handleChange}
                                    className={errors.joinDate ? 'error' : ''}
                                />
                                {errors.joinDate && (
                                    <span className="error-message">{errors.joinDate}</span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="avatar">
                                    Avatar Image
                                </label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <small className="form-hint">Upload a profile picture for the trainer</small>
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/trainers')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (isEditMode ? 'Update Trainer' : 'Create Trainer')}
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

export default AddTrainer;
