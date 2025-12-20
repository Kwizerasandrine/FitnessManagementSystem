import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import dietService from '../../services/diet.service';
import AlertModal from '../../components/common/AlertModal';
import './UserDiets.css';

const UserDiets = () => {
    const history = useHistory();
    const [diets, setDiets] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState(null);
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
        loadDiets();
        // TODO: Load user's current diet from API
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

    const loadDiets = async () => {
        try {
            setLoading(true);
            const data = await dietService.getAllDiets();
            // Handle both unwrapped array and wrapped response
            const dietList = Array.isArray(data) ? data : (data?.data || []);
            setDiets(Array.isArray(dietList) ? dietList : []);
        } catch (error) {
            console.error('Error loading diets:', error);
            setDiets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectDiet = (diet) => {
        showConfirm(
            'Confirm Selection',
            `Select "${diet.dietName}" as your diet plan?`,
            async () => {
                try {
                    setLoading(true);
                    // TODO: API call to assign diet to user
                    setSelectedDiet(diet);
                    showAlert('success', 'Success', 'Diet plan selected successfully!');
                } catch (error) {
                    console.error('Error selecting diet:', error);
                    showAlert('error', 'Error', 'Failed to select diet');
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    const handleRemoveDiet = () => {
        showConfirm(
            'Confirm Removal',
            'Remove your current diet plan?',
            () => {
                setSelectedDiet(null);
                showAlert('success', 'Success', 'Diet plan removed');
            }
        );
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDiets = Array.isArray(diets) ? diets.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil((diets?.length || 0) / itemsPerPage);

    return (
        <MainLayout>
            <div className="user-diets-page">
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
                        <h1>🥗 Diet Plans</h1>
                        <p>Choose a diet plan that fits your fitness goals</p>
                    </div>
                    <Button onClick={() => history.push('/user-dashboard')} variant="secondary">
                        ← Back to Dashboard
                    </Button>
                </div>

                {selectedDiet && (
                    <div className="selected-diet-section">
                        <h2>Your Current Diet Plan</h2>
                        <div className="selected-diet-card">
                            <div className="diet-badge">Active</div>
                            <h3>{selectedDiet.dietName}</h3>
                            <div className="diet-type">{selectedDiet.dietType}</div>
                            <div className="diet-macros">
                                <div className="macro">
                                    <span className="macro-label">Calories</span>
                                    <span className="macro-value">{selectedDiet.calories}</span>
                                </div>
                                <div className="macro">
                                    <span className="macro-label">Protein</span>
                                    <span className="macro-value">{selectedDiet.protein}g</span>
                                </div>
                                <div className="macro">
                                    <span className="macro-label">Carbs</span>
                                    <span className="macro-value">{selectedDiet.carbs}g</span>
                                </div>
                                <div className="macro">
                                    <span className="macro-label">Fats</span>
                                    <span className="macro-value">{selectedDiet.fats}g</span>
                                </div>
                            </div>
                            <p className="diet-description">{selectedDiet.description}</p>
                            <Button variant="danger" onClick={handleRemoveDiet}>
                                Remove Diet Plan
                            </Button>
                        </div>
                    </div>
                )}

                <div className="available-diets-section">
                    <h2>Available Diet Plans</h2>
                    {loading && <p>Loading diets...</p>}

                    <div className="diets-grid">
                        {currentDiets.map(diet => (
                            <div key={diet.id} className="diet-card">
                                <div className="diet-header">
                                    <h3>{diet.dietName}</h3>
                                    <span className="diet-type-badge">{diet.dietType}</span>
                                </div>
                                <div className="diet-body">
                                    <div className="macros-grid">
                                        <div className="macro-item">
                                            <div className="macro-icon">🔥</div>
                                            <div>
                                                <div className="macro-label">Calories</div>
                                                <div className="macro-value">{diet.calories}</div>
                                            </div>
                                        </div>
                                        <div className="macro-item">
                                            <div className="macro-icon">💪</div>
                                            <div>
                                                <div className="macro-label">Protein</div>
                                                <div className="macro-value">{diet.protein}g</div>
                                            </div>
                                        </div>
                                        <div className="macro-item">
                                            <div className="macro-icon">🍞</div>
                                            <div>
                                                <div className="macro-label">Carbs</div>
                                                <div className="macro-value">{diet.carbs}g</div>
                                            </div>
                                        </div>
                                        <div className="macro-item">
                                            <div className="macro-icon">🥑</div>
                                            <div>
                                                <div className="macro-label">Fats</div>
                                                <div className="macro-value">{diet.fats}g</div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="diet-description">{diet.description}</p>
                                </div>
                                <div className="diet-footer">
                                    {selectedDiet?.id === diet.id ? (
                                        <Button variant="success" disabled>
                                            ✓ Selected
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleSelectDiet(diet)}
                                            disabled={loading}
                                        >
                                            Select This Diet
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

export default UserDiets;
