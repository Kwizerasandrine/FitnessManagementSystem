import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import dietService from '../../services/diet.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './DietList.css';

const DietList = () => {
    const history = useHistory();
    const [diets, setDiets] = useState([]);
    const [filteredDiets, setFilteredDiets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDietId, setSelectedDietId] = useState(null);

    const columns = [
        { key: 'dietName', label: 'Diet Name' },
        { key: 'day', label: 'Day' },
        { key: 'morning', label: 'Morning' },
        { key: 'afternoon', label: 'Afternoon' },
        { key: 'evening', label: 'Evening' },
        { key: 'night', label: 'Night' }
    ];

    useEffect(() => {
        loadDiets();
    }, []);

    const loadDiets = async () => {
        try {
            setLoading(true);
            const response = await dietService.getAllDiets();
            const dietsData = response.data || response || [];
            setDiets(dietsData);
            setFilteredDiets(dietsData);
        } catch (error) {
            console.error('Error loading diets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = diets.filter(diet => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], diet);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredDiets(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredDiets(diets);
        setCurrentPage(1);
    };

    const handleDeleteClick = (id) => {
        setSelectedDietId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedDietId) {
            try {
                await dietService.deleteDiet(selectedDietId);
                // alert('Diet plan deleted successfully'); // Optional: remove or keep based on preference
                loadDiets();
            } catch (error) {
                console.error('Error deleting diet:', error);
                alert('Failed to delete diet plan');
            } finally {
                setIsModalOpen(false);
                setSelectedDietId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDietId(null);
    };

    const handleEdit = (id) => {
        history.push(`/diet/edit/${id}`);
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredDiets.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentDiets = filteredDiets.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="diet-list-page">
                <div className="page-header">
                    <h1>🥗 Diet Management</h1>
                    <Button onClick={() => history.push('/diet/add')} variant="primary">
                        ➕ Add New Diet Plan
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading diet plans...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Diet Name</th>
                                            <th>Day</th>
                                            <th>Morning</th>
                                            <th>Afternoon</th>
                                            <th>Evening</th>
                                            <th>Night</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentDiets.length > 0 ? (
                                            currentDiets.map(diet => (
                                                <tr key={diet.id}>
                                                    <td>{diet.id}</td>
                                                    <td>{diet.dietName}</td>
                                                    <td>{diet.day}</td>
                                                    <td>{diet.morning}</td>
                                                    <td>{diet.afternoon}</td>
                                                    <td>{diet.evening}</td>
                                                    <td>{diet.night}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="primary"
                                                                onClick={() => handleEdit(diet.id)}
                                                            >
                                                                ✏️ Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDeleteClick(diet.id)}
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
                                                    No diet plans found
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
                                totalItems={filteredDiets.length}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete Diet Plan"
                message="Are you sure you want to delete this diet plan? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default DietList;
