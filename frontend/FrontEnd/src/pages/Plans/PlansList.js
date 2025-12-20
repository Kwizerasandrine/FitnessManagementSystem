import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import planService from '../../services/plan.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './PlansList.css';

const PlansList = () => {
    const history = useHistory();
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    const columns = [
        { key: 'membershipPlanName', label: 'Plan Name' },
        { key: 'duration', label: 'Duration' },
        { key: 'startHour', label: 'Start Hour' },
        { key: 'endHour', label: 'End Hour' },
        { key: 'price', label: 'Price' },
        { key: 'trainerName', label: 'Trainer' }
    ];

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            setLoading(true);
            const response = await planService.getAllPlans();
            const plansData = response.data || response || [];
            setPlans(plansData);
            setFilteredPlans(plansData);
        } catch (error) {
            console.error('Error loading plans:', error);
            // alert('Failed to load'); // Removed annoying popup
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = plans.filter(plan => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], plan);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredPlans(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredPlans(plans);
        setCurrentPage(1);
    };

    const handleDeleteClick = (id) => {
        setSelectedPlanId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPlanId) {
            try {
                await planService.deletePlan(selectedPlanId);
                // alert('Plan deleted successfully');
                loadPlans();
            } catch (error) {
                console.error('Error deleting plan:', error);
                alert('Failed to delete plan');
            } finally {
                setIsModalOpen(false);
                setSelectedPlanId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPlanId(null);
    };

    const handleEdit = (id) => {
        history.push(`/plans/edit/${id}`);
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredPlans.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPlans = filteredPlans.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="plans-list-page">
                <div className="page-header">
                    <h1>📋 Plans Management</h1>
                    <Button onClick={() => history.push('/plans/add')} variant="primary">
                        ➕ Add New Plan
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading plans...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Plan Name</th>
                                            <th>Duration (days)</th>
                                            <th>Start Hour</th>
                                            <th>End Hour</th>
                                            <th>Price ($)</th>
                                            <th>Trainer</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPlans.length > 0 ? (
                                            currentPlans.map(plan => (
                                                <tr key={plan.id}>
                                                    <td>{plan.id}</td>
                                                    <td>{plan.membershipPlanName}</td>
                                                    <td>{plan.duration}</td>
                                                    <td>{plan.startHour}</td>
                                                    <td>{plan.endHour}</td>
                                                    <td>${plan.price?.toFixed(2)}</td>
                                                    <td>{plan.trainerName}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="primary"
                                                                onClick={() => handleEdit(plan.id)}
                                                            >
                                                                ✏️ Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDeleteClick(plan.id)}
                                                            >
                                                                🗑️ Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="no-data">
                                                    No plans found
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
                                totalItems={filteredPlans.length}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete Plan"
                message="Are you sure you want to delete this plan? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default PlansList;
