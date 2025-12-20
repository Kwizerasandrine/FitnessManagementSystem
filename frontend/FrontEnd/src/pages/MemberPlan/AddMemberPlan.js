import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import memberPlanService from '../../services/memberplan.service';
import memberService from '../../services/member.service';
import planService from '../../services/plan.service';
import AlertModal from '../../components/common/AlertModal';
import './AddMemberPlan.css';

const AddMemberPlan = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        userId: '',
        planId: ''
    });

    const [users, setUsers] = useState([]);
    const [plans, setPlans] = useState([]);
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

    const showAlert = (title, message, type, onClose = null) => {
        setAlertState({
            isOpen: true,
            title,
            message,
            type,
            onClose: onClose || (() => setAlertState(prev => ({ ...prev, isOpen: false })))
        });
    };

    useEffect(() => {
        loadUsersAndPlans();
    }, []);

    const loadUsersAndPlans = async () => {
        try {
            setLoading(true);

            // Load users
            let usersData = [];
            let usersError = null;
            try {
                // Reduced size to 10 to match MembersList exactly
                const usersResponse = await memberService.getAllMembers(0, 10);
                usersData = usersResponse.content || usersResponse.data || (Array.isArray(usersResponse) ? usersResponse : []) || [];
                console.log('Users loaded:', usersData);
            } catch (err) {
                console.error('Error loading users:', err);
                usersError = err;
            }

            // Load plans
            let plansData = [];
            let plansError = null;
            try {
                const plansResponse = await planService.getAllPlans();
                plansData = plansResponse.data || (Array.isArray(plansResponse) ? plansResponse : []) || [];
            } catch (err) {
                console.error('Error loading plans:', err);
                plansError = err;
            }

            if (usersData.length === 0 && plansData.length === 0) {
                if (usersError || plansError) {
                    throw new Error('Failed to load data');
                }
            }

            // Handle partial failures
            if (usersData.length === 0 && usersError) {
                const errorMessage = usersError.response?.data?.message || usersError.message || 'Unknown error';
                const status = usersError.response?.status ? ` (Status: ${usersError.response.status})` : '';
                showAlert('Warning', `Failed to load users: ${errorMessage}${status}`, 'error');
            } else if (plansData.length === 0 && plansError) {
                showAlert('Warning', 'Failed to load plans list.', 'error');
            }

            setUsers(Array.isArray(usersData) ? usersData : []);
            setPlans(Array.isArray(plansData) ? plansData : []);

        } catch (error) {
            console.error('Error loading data:', error);
            showAlert('Error', 'Failed to load data. Please try refreshing the page.', 'error');
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

        if (!formData.userId) {
            newErrors.userId = 'User is required';
        }

        if (!formData.planId) {
            newErrors.planId = 'Plan is required';
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
            const planData = {
                userId: parseInt(formData.userId),
                planId: parseInt(formData.planId)
            };

            await memberPlanService.addUserPlan(planData);
            showAlert('Success', 'Subscription added successfully', 'success', () => {
                history.push('/memberplans');
            });
        } catch (error) {
            console.error('Error adding subscription:', error);
            showAlert('Error', 'Failed to add subscription', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-memberplan-page">
                <div className="page-header">
                    <h1>➕ Add New Subscription</h1>
                    <Button onClick={() => history.push('/memberplans')} variant="secondary">
                        ← Back to Subscriptions
                    </Button>
                </div>

                <div className="page-content">
                    <form onSubmit={handleSubmit} className="memberplan-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userId">
                                    Select User <span className="required">*</span>
                                </label>
                                <select
                                    id="userId"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    className={errors.userId ? 'error' : ''}
                                >
                                    <option value="">-- Select User --</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.completeName} (ID: {user.id})
                                        </option>
                                    ))}
                                </select>
                                {errors.userId && (
                                    <span className="error-message">{errors.userId}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="planId">
                                    Select Plan <span className="required">*</span>
                                </label>
                                <select
                                    id="planId"
                                    name="planId"
                                    value={formData.planId}
                                    onChange={handleChange}
                                    className={errors.planId ? 'error' : ''}
                                >
                                    <option value="">-- Select Plan --</option>
                                    {plans.map(plan => (
                                        <option key={plan.id} value={plan.id}>
                                            {plan.membershipPlanName} - ${plan.price}
                                        </option>
                                    ))}
                                </select>
                                {errors.planId && (
                                    <span className="error-message">{errors.planId}</span>
                                )}
                            </div>
                        </div>

                        <div className="info-box">
                            <p>ℹ️ The subscription date will be automatically set to today's date.</p>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/memberplans')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Subscription'}
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

export default AddMemberPlan;
