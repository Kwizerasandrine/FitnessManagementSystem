import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import dietService from '../../services/diet.service';
import AlertModal from '../../components/common/AlertModal';
import './AddDiet.css';

const AddDiet = () => {
    const history = useHistory();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        dietName: '',
        day: '',
        morning: '',
        afternoon: '',
        evening: '',
        night: ''
    });

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

    useEffect(() => {
        if (isEditMode) {
            loadDiet();
        }
    }, [id]);

    const loadDiet = async () => {
        try {
            setLoading(true);
            const response = await dietService.getDietById(id);
            const dietData = response.data || response;
            setFormData({
                dietName: dietData.dietName || '',
                day: dietData.day || '',
                morning: dietData.morning || '',
                afternoon: dietData.afternoon || '',
                evening: dietData.evening || '',
                night: dietData.night || ''
            });
        } catch (error) {
            console.error('Error loading diet:', error);
            showAlert('Error', 'Failed to load diet plan details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.dietName.trim()) {
            newErrors.dietName = 'Diet name is required';
        }

        if (!formData.day.trim()) {
            newErrors.day = 'Day is required';
        }

        if (!formData.morning.trim()) {
            newErrors.morning = 'Morning meal is required';
        }

        if (!formData.afternoon.trim()) {
            newErrors.afternoon = 'Afternoon meal is required';
        }

        if (!formData.evening.trim()) {
            newErrors.evening = 'Evening meal is required';
        }

        if (!formData.night.trim()) {
            newErrors.night = 'Night meal is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showAlert = (title, message, type, onClose = null) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onClose || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const dietData = { ...formData };

            if (isEditMode) {
                dietData.id = parseInt(id);
                await dietService.updateDiet(dietData);
                showAlert('Success', 'Diet plan updated successfully', 'success', () => {
                    history.push('/diet');
                });
            } else {
                await dietService.createDiet(dietData);
                showAlert('Success', 'Diet plan created successfully', 'success', () => {
                    history.push('/diet');
                });
            }
        } catch (error) {
            console.error('Error saving diet:', error);
            showAlert('Error', 'Failed to save diet plan', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-diet-page">
                <div className="page-header">
                    <h1>{isEditMode ? '✏️ Edit Diet Plan' : '➕ Add New Diet Plan'}</h1>
                    <Button onClick={() => history.push('/diet')} variant="secondary">
                        ← Back to Diet Plans
                    </Button>
                </div>

                <div className="page-content">
                    <form onSubmit={handleSubmit} className="diet-form">
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="dietName">
                                    Diet Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="dietName"
                                    name="dietName"
                                    value={formData.dietName}
                                    onChange={handleChange}
                                    className={errors.dietName ? 'error' : ''}
                                    placeholder="e.g., Keto Diet Plan"
                                />
                                {errors.dietName && (
                                    <span className="error-message">{errors.dietName}</span>
                                )}
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="day">
                                    Day <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="day"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    className={errors.day ? 'error' : ''}
                                    placeholder="e.g., Monday"
                                />
                                {errors.day && (
                                    <span className="error-message">{errors.day}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="morning">
                                    Morning Meal <span className="required">*</span>
                                </label>
                                <textarea
                                    id="morning"
                                    name="morning"
                                    value={formData.morning}
                                    onChange={handleChange}
                                    className={errors.morning ? 'error' : ''}
                                    placeholder="e.g., Oatmeal with fruits"
                                    rows="3"
                                />
                                {errors.morning && (
                                    <span className="error-message">{errors.morning}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="afternoon">
                                    Afternoon Meal <span className="required">*</span>
                                </label>
                                <textarea
                                    id="afternoon"
                                    name="afternoon"
                                    value={formData.afternoon}
                                    onChange={handleChange}
                                    className={errors.afternoon ? 'error' : ''}
                                    placeholder="e.g., Grilled chicken with vegetables"
                                    rows="3"
                                />
                                {errors.afternoon && (
                                    <span className="error-message">{errors.afternoon}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="evening">
                                    Evening Meal <span className="required">*</span>
                                </label>
                                <textarea
                                    id="evening"
                                    name="evening"
                                    value={formData.evening}
                                    onChange={handleChange}
                                    className={errors.evening ? 'error' : ''}
                                    placeholder="e.g., Protein shake"
                                    rows="3"
                                />
                                {errors.evening && (
                                    <span className="error-message">{errors.evening}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="night">
                                    Night Meal <span className="required">*</span>
                                </label>
                                <textarea
                                    id="night"
                                    name="night"
                                    value={formData.night}
                                    onChange={handleChange}
                                    className={errors.night ? 'error' : ''}
                                    placeholder="e.g., Light salad"
                                    rows="3"
                                />
                                {errors.night && (
                                    <span className="error-message">{errors.night}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/diet')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (isEditMode ? 'Update Diet Plan' : 'Create Diet Plan')}
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

export default AddDiet;
