import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import trainerService from '../../services/trainer.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './TrainersList.css';

const TrainersList = () => {
    const history = useHistory();
    const [trainers, setTrainers] = useState([]);
    const [filteredTrainers, setFilteredTrainers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrainerId, setSelectedTrainerId] = useState(null);

    const columns = [
        { key: 'trainerName', label: 'Name' },
        { key: 'contact', label: 'Contact' },
        { key: 'address', label: 'Address' },
        { key: 'salary', label: 'Salary' },
        { key: 'joinDate', label: 'Join Date' }
    ];

    useEffect(() => {
        loadTrainers();
    }, []);

    const loadTrainers = async () => {
        try {
            setLoading(true);
            const response = await trainerService.getAllTrainers();
            const trainersData = response.data || response || [];
            setTrainers(trainersData);
            setFilteredTrainers(trainersData);
        } catch (error) {
            console.error('Error loading trainers:', error);
            // alert('Failed to load'); // Removed annoying popup
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = trainers.filter(trainer => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], trainer);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredTrainers(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredTrainers(trainers);
        setCurrentPage(1);
    };

    const handleDeleteClick = (id) => {
        setSelectedTrainerId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedTrainerId) {
            try {
                await trainerService.deleteTrainer(selectedTrainerId);
                // alert('Trainer deleted successfully');
                loadTrainers();
            } catch (error) {
                console.error('Error deleting trainer:', error);
                alert('Failed to delete trainer');
            } finally {
                setIsModalOpen(false);
                setSelectedTrainerId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTrainerId(null);
    };

    const handleEdit = (id) => {
        history.push(`/trainers/edit/${id}`);
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredTrainers.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentTrainers = filteredTrainers.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="trainers-list-page">
                <div className="page-header">
                    <h1>💪 Trainers Management</h1>
                    <Button onClick={() => history.push('/trainers/add')} variant="primary">
                        ➕ Add New Trainer
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading trainers...</div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Salary ($)</th>
                                            <th>Join Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentTrainers.length > 0 ? (
                                            currentTrainers.map(trainer => (
                                                <tr key={trainer.id}>
                                                    <td>{trainer.id}</td>
                                                    <td>{trainer.trainerName}</td>
                                                    <td>{trainer.contact}</td>
                                                    <td>{trainer.address}</td>
                                                    <td>${trainer.salary?.toFixed(2)}</td>
                                                    <td>{trainer.joinDate}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Button
                                                                size="small"
                                                                variant="primary"
                                                                onClick={() => handleEdit(trainer.id)}
                                                            >
                                                                ✏️ Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="danger"
                                                                onClick={() => handleDeleteClick(trainer.id)}
                                                            >
                                                                🗑️ Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="no-data">
                                                    No trainers found
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
                                totalItems={filteredTrainers.length}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete Trainer"
                message="Are you sure you want to delete this trainer? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default TrainersList;
