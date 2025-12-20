import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import planService from '../../services/plan.service';
import memberPlanService from '../../services/memberplan.service';
import AlertModal from '../../components/common/AlertModal';
import './UserPlans.css';

const UserPlans = () => {
    const history = useHistory();
    const [plans, setPlans] = useState([]);
    const [userPlans, setUserPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [alertInfo, setAlertInfo] = useState({
        show: false,
        type: '',
        title: '',
        message: '',
        showCancel: false,
        onConfirm: null
    });

    const itemsPerPage = 6;
    const userId = localStorage.getItem('id');

    useEffect(() => {
        loadPlans();
        loadUserPlans();
    }, []);

    const showAlert = (type, title, message) => {
        setAlertInfo({
            show: true,
            type,
            title,
            message,
            showCancel: false,
            onConfirm: () => closeAlert()
        });
    };

    const showConfirm = (title, message, onConfirmAction) => {
        setAlertInfo({
            show: true,
            type: 'warning',
            title,
            message,
            showCancel: true,
            onConfirm: () => {
                closeAlert();
                onConfirmAction();
            }
        });
    };

    const closeAlert = () => {
        setAlertInfo({ ...alertInfo, show: false });
    };

    const loadPlans = async () => {
        try {
            setLoading(true);
            const data = await planService.getAllPlans();
            const plansList = data.data || data || [];
            setPlans(Array.isArray(plansList) ? plansList : []);
        } catch (error) {
            console.error('Error loading plans:', error);
            // Don't show alert, just log the error
        } finally {
            setLoading(false);
        }
    };

    const loadUserPlans = async () => {
        try {
            const data = await memberPlanService.getUserPlans();
            const userPlansList = data.data || data || [];
            setUserPlans(Array.isArray(userPlansList) ? userPlansList : []);
        } catch (error) {
            console.error('Error loading user plans:', error);
            setUserPlans([]);
        }
    };

    const handleSubscribe = (planId) => {
        showConfirm(
            'Confirm Subscription',
            'Are you sure you want to subscribe to this plan?',
            async () => {
                try {
                    setLoading(true);
                    await memberPlanService.addUserPlan({
                        userId: parseInt(userId),
                        planId: planId
                    });
                    showAlert('success', 'Success', 'Successfully subscribed to plan!');
                    loadUserPlans();
                } catch (error) {
                    console.error('Error subscribing to plan:', error);
                    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
                    showAlert('error', 'Subscription Failed', `Failed to subscribe: ${errorMessage}`);
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    const handleUnsubscribe = (planId) => {
        showConfirm(
            'Confirm Unsubscription',
            'Are you sure you want to unsubscribe from this plan?',
            async () => {
                try {
                    setLoading(true);
                    // Verify backend expects { userId, planId } for delete
                    await memberPlanService.deleteUserPlan({
                        userId: parseInt(userId),
                        planId: planId
                    });

                    // Optimistic update: remove from list immediately
                    setUserPlans(prev => prev.filter(p => p.id !== planId));

                    showAlert('success', 'Success', 'Successfully unsubscribed from plan!');
                    loadUserPlans();
                } catch (error) {
                    console.error('Error unsubscribing:', error);
                    const errorMessage = error.response?.data?.message || 'Failed to unsubscribe';
                    showAlert('error', 'Unsubscribe Failed', errorMessage);
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    const isSubscribed = (planId) => {
        return userPlans.some(up => up.id === planId);
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlans = Array.isArray(plans) ? plans.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil(plans.length / itemsPerPage);

    return (
        <MainLayout>
            <div className="user-plans-page">
                <AlertModal
                    isOpen={alertInfo.show}
                    onClose={closeAlert}
                    type={alertInfo.type}
                    title={alertInfo.title}
                    message={alertInfo.message}
                    showCancel={alertInfo.showCancel}
                    onConfirm={alertInfo.onConfirm}
                />
                <div className="page-header">
                    <div>
                        <h1>📋 Membership Plans</h1>
                        <p>Browse and subscribe to our membership plans</p>
                    </div>
                    <Button onClick={() => history.push('/user-dashboard')} variant="secondary">
                        ← Back to Dashboard
                    </Button>
                </div>

                {userPlans.length > 0 && (
                    <div className="active-plans-section">
                        <h2>Your Active Plans</h2>
                        <div className="active-plans-grid">
                            {userPlans.map(userPlan => (
                                <div key={userPlan.id} className="active-plan-card">
                                    <div className="plan-badge">Active</div>
                                    <h3>{userPlan.membershipPlanName}</h3>
                                    <div className="plan-details">
                                        <p><strong>Duration:</strong> {userPlan.duration} months</p>
                                        <p><strong>Price:</strong> ${userPlan.price}</p>
                                        <p><strong>Hours:</strong> {userPlan.startHour} - {userPlan.endHour}</p>
                                    </div>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleUnsubscribe(userPlan.id)}
                                        disabled={loading}
                                    >
                                        Unsubscribe
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="available-plans-section">
                    <h2>Available Plans</h2>
                    {loading && <p>Loading plans...</p>}

                    <div className="plans-grid">
                        {currentPlans.map(plan => (
                            <div key={plan.id} className="plan-card">
                                <div className="plan-header">
                                    <h3>{plan.membershipPlanName}</h3>
                                    <div className="plan-price">${plan.price}</div>
                                </div>
                                <div className="plan-body">
                                    <div className="plan-info">
                                        <p><strong>Duration:</strong> {plan.duration} months</p>
                                        <p><strong>Training Hours:</strong> {plan.startHour} - {plan.endHour}</p>
                                        {plan.trainerName && (
                                            <p><strong>Trainer:</strong> {plan.trainerName}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="plan-footer">
                                    {isSubscribed(plan.id) ? (
                                        <Button variant="success" disabled>
                                            ✓ Subscribed
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSubscribe(plan.id)}
                                            disabled={loading}
                                        >
                                            Subscribe Now
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default UserPlans;
