import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import trainerService from '../../services/trainer.service';
import { API_URL } from '../../components/common/URL';
import AlertModal from '../../components/common/AlertModal';
import './UserTrainers.css';

const UserTrainers = () => {
    const history = useHistory();
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
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

    useEffect(() => {
        loadTrainers();
        // TODO: Load user's assigned trainer from API
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

    const loadTrainers = async () => {
        try {
            setLoading(true);
            const data = await trainerService.getAllTrainers();
            setTrainers(data.data || data || []);
        } catch (error) {
            console.error('Error loading trainers:', error);
            // Don't show alert, just log the error
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTrainer = (trainer) => {
        showConfirm(
            'Confirm Selection',
            `Select ${trainer.trainerName} as your trainer?`,
            async () => {
                try {
                    setLoading(true);
                    // TODO: API call to assign trainer to user
                    // For now just simulate success
                    setSelectedTrainer(trainer);
                    showAlert('success', 'Success', 'Trainer selected successfully!');
                } catch (error) {
                    console.error('Error selecting trainer:', error);
                    showAlert('error', 'Error', 'Failed to select trainer');
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    const handleRemoveTrainer = () => {
        showConfirm(
            'Confirm Removal',
            'Remove your current trainer assignment?',
            () => {
                setSelectedTrainer(null);
                showAlert('success', 'Success', 'Trainer removed successfully');
            }
        );
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTrainers = Array.isArray(trainers) ? trainers.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil(trainers.length / itemsPerPage);

    return (
        <MainLayout>
            <div className="user-trainers-page">
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
                        <h1>🏋️ Personal Trainers</h1>
                        <p>Choose a personal trainer to guide your fitness journey</p>
                    </div>
                    <Button onClick={() => history.push('/user-dashboard')} variant="secondary">
                        ← Back to Dashboard
                    </Button>
                </div>

                {selectedTrainer && (
                    <div className="selected-trainer-section">
                        <h2>Your Personal Trainer</h2>
                        <div className="selected-trainer-card">
                            <div className="trainer-badge">Assigned</div>
                            {selectedTrainer.avatar && (
                                <img
                                    src={`${API_URL}${selectedTrainer.avatar}`}
                                    alt={selectedTrainer.trainerName}
                                    className="trainer-avatar-large"
                                />
                            )}
                            <h3>{selectedTrainer.trainerName}</h3>
                            <div className="trainer-details">
                                <p><strong>📞 Contact:</strong> {selectedTrainer.contact}</p>
                                <p><strong>📍 Address:</strong> {selectedTrainer.address}</p>
                                <p><strong>📅 Joined:</strong> {selectedTrainer.joinDate ? new Date(selectedTrainer.joinDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <Button variant="danger" onClick={handleRemoveTrainer}>
                                Remove Trainer
                            </Button>
                        </div>
                    </div>
                )}

                <div className="available-trainers-section">
                    <h2>Available Trainers</h2>
                    {loading && <p>Loading trainers...</p>}

                    <div className="trainers-grid">
                        {currentTrainers.map(trainer => (
                            <div key={trainer.id} className="trainer-card">
                                <div className="trainer-image-container">
                                    {trainer.avatar ? (
                                        <img
                                            src={`${API_URL}${trainer.avatar}`}
                                            alt={trainer.trainerName}
                                            className="trainer-avatar"
                                        />
                                    ) : (
                                        <div className="trainer-avatar-placeholder">
                                            <span>🏋️</span>
                                        </div>
                                    )}
                                </div>
                                <div className="trainer-info">
                                    <h3>{trainer.trainerName}</h3>
                                    <div className="trainer-contact-info">
                                        <p><strong>📞</strong> {trainer.contact}</p>
                                        <p><strong>📍</strong> {trainer.address}</p>
                                        <p><strong>💰</strong> ${trainer.salary}/month</p>
                                        <p><strong>📅</strong> Joined {trainer.joinDate ? new Date(trainer.joinDate).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="trainer-footer">
                                    {selectedTrainer?.id === trainer.id ? (
                                        <Button variant="success" disabled>
                                            ✓ Your Trainer
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSelectTrainer(trainer)}
                                            disabled={loading}
                                        >
                                            Select Trainer
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

export default UserTrainers;
