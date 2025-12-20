import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import planService from '../../services/plan.service';
import AlertModal from '../../components/common/AlertModal';
import './AddPlan.css';

const AddPlan = () => {
    const history = useHistory();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        membershipPlanName: '',
        duration: '',
        startHour: '',
        endHour: '',
        price: '',
        trainerName: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success',
        onClose: () => setAlertState(prev => ({ ...prev, isOpen: false }))
    });

    const showAlert = React.useCallback((title, message, type = 'success', onCloseOverride) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onCloseOverride || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    }, []);

    const loadPlan = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await planService.getPlanById(id);

            console.log('=== PLAN LOADING DEBUG ===');
            console.log('Full response:', response);

            let planData = null;

            // Handle different response structures
            if (response.data) {
                planData = response.data;
            } else if (response.status === 'success' && response.data) {
                planData = response.data;
            } else {
                planData = response;
            }

            if (planData) {
                setFormData({
                    membershipPlanName: planData.membershipPlanName || '',
                    duration: planData.duration || '',
                    startHour: planData.startHour || '',
                    endHour: planData.endHour || '',
                    price: planData.price || '',
                    trainerName: planData.trainerName || ''
                });
            }
        } catch (error) {
            console.error("Error loading plan:", error);
            showAlert('Error', 'Failed to load plan details', 'error', () => history.push('/plans'));
        } finally {
            setLoading(false);
        }
    }, [id, history, showAlert]);

    useEffect(() => {
        if (isEditMode) {
            loadPlan();
        }
    }, [isEditMode, loadPlan, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.membershipPlanName) newErrors.membershipPlanName = 'Plan Name is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.startHour) newErrors.startHour = 'Start Hour is required';
        if (!formData.endHour) newErrors.endHour = 'End Hour is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.trainerName) newErrors.trainerName = 'Trainer Name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            if (isEditMode) {
                await planService.updatePlan({ ...formData, id });
                showAlert('Success', 'Plan updated successfully', 'success', () => history.push('/plans'));
            } else {
                await planService.createPlan(formData);
                showAlert('Success', 'Plan created successfully', 'success', () => history.push('/plans'));
            }
        } catch (error) {
            console.error("Error saving plan:", error);
            showAlert('Error', 'Failed to save plan. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-plan-container">
                <div className="form-card">
                    <h2>{isEditMode ? 'Edit Plan' : 'Add New Plan'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="membershipPlanName">
                                    Plan Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="membershipPlanName"
                                    name="membershipPlanName"
                                    value={formData.membershipPlanName}
                                    onChange={handleChange}
                                    className={errors.membershipPlanName ? 'error' : ''}
                                    placeholder="e.g., Gold Membership"
                                />
                                {errors.membershipPlanName && (
                                    <span className="error-message">{errors.membershipPlanName}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="duration">
                                    Duration (months) <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className={errors.duration ? 'error' : ''}
                                    placeholder="e.g., 12"
                                />
                                {errors.duration && (
                                    <span className="error-message">{errors.duration}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="startHour">
                                    Start Hour <span className="required">*</span>
                                </label>
                                <input
                                    type="time"
                                    id="startHour"
                                    name="startHour"
                                    value={formData.startHour}
                                    onChange={handleChange}
                                    className={errors.startHour ? 'error' : ''}
                                />
                                {errors.startHour && (
                                    <span className="error-message">{errors.startHour}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="endHour">
                                    End Hour <span className="required">*</span>
                                </label>
                                <input
                                    type="time"
                                    id="endHour"
                                    name="endHour"
                                    value={formData.endHour}
                                    onChange={handleChange}
                                    className={errors.endHour ? 'error' : ''}
                                />
                                {errors.endHour && (
                                    <span className="error-message">{errors.endHour}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="price">
                                    Price <span className="required">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className={errors.price ? 'error' : ''}
                                    placeholder="e.g., 500"
                                />
                                {errors.price && (
                                    <span className="error-message">{errors.price}</span>
                                )}
                            </div>

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
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/plans')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (isEditMode ? 'Update Plan' : 'Create Plan')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <AlertModal
                isOpen={alertState.isOpen}
                onClose={alertState.onClose}
                title={alertState.title}
                message={alertState.message}
                type={alertState.type}
            />
        </MainLayout>
    );
};

export default AddPlan;
