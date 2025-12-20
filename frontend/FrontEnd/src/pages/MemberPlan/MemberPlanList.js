import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import memberPlanService from '../../services/memberplan.service';
import memberService from '../../services/member.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './MemberPlanList.css';

const MemberPlanList = () => {
    const history = useHistory();
    const [memberPlans, setMemberPlans] = useState([]);
    const [filteredMemberPlans, setFilteredMemberPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { key: 'userName', label: 'Member Name' },
        { key: 'planName', label: 'Plan Name' },
        { key: 'subscriptionDate', label: 'Subscription Date' }
    ];

    useEffect(() => {
        loadMemberPlans();
    }, []);

    const loadMemberPlans = async () => {
        try {
            setLoading(true);
            // WORKAROUND: Backend doesn't have getAllMemberPlans.
            // Fetch ALL users (which includes their plans) and flatten the list.
            const response = await memberService.getAllMembers(0, 1000); // Fetch large page to get all
            const users = response.content || response.data || response || [];

            const flattenedPlans = [];

            if (Array.isArray(users)) {
                users.forEach(user => {
                    if (user.planList && Array.isArray(user.planList)) {
                        user.planList.forEach(plan => {
                            flattenedPlans.push({
                                id: `${user.id}-${plan.id}`, // specific unique key for React
                                userId: user.id,
                                userName: user.completeName || user.email || 'Unknown',
                                planId: plan.id,
                                planName: plan.membershipPlanName,
                                subscriptionDate: 'Active', // Date not available in User->Plan mapping
                            });
                        });
                    }
                });
            }

            setMemberPlans(flattenedPlans);
            setFilteredMemberPlans(flattenedPlans);
        } catch (error) {
            console.error('Error loading member plans:', error);
            const status = error.response?.status ? ` (Status: ${error.response.status})` : '';
            // alert(`Failed to load subscriptions${status}`); hiding alert to reduce noise
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = memberPlans.filter(plan => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], plan);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredMemberPlans(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredMemberPlans(memberPlans);
        setCurrentPage(1);
    };

    const handleDelete = async (plan) => {
        if (window.confirm(`Are you sure you want to remove ${plan.planName} from ${plan.userName}?`)) {
            try {
                // Delete using composite key object
                await memberPlanService.deleteUserPlan({
                    userId: plan.userId,
                    planId: plan.planId
                });
                alert('Subscription removed successfully');
                loadMemberPlans();
            } catch (error) {
                console.error('Error deleting subscription:', error);
                alert('Failed to remove subscription');
            }
        }
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredMemberPlans.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentMemberPlans = filteredMemberPlans.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="memberplan-list-page">
                <div className="page-header">
                    <h1>📅 Member Plan Subscriptions</h1>
                    <Button onClick={() => history.push('/memberplans/add')} variant="primary">
                        ➕ Add New Subscription
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading subscriptions...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Member Name</th>
                                            <th>Plan Name</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMemberPlans.length > 0 ? (
                                            currentMemberPlans.map(plan => (
                                                <tr key={plan.id}>
                                                    <td>{plan.userName}</td>
                                                    <td>{plan.planName}</td>
                                                    <td>
                                                        <span className="role-badge role-user">
                                                            {plan.subscriptionDate}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDelete(plan)}
                                                            >
                                                                🗑️ Remove
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="no-data">
                                                    No subscriptions found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                pageSize={pageSize}
                                onPageSizeChange={setPageSize}
                                totalItems={filteredMemberPlans.length}
                            />
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default MemberPlanList;
