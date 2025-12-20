import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import TableSearch from '../../components/common/TableSearch';
import feedbackService from '../../services/feedback.service';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import './FeedbackList.css';

const FeedbackList = () => {
    const history = useHistory();
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [responseText, setResponseText] = useState({});
    const [respondingTo, setRespondingTo] = useState(null);

    const columns = [
        { key: 'feedback', label: 'Feedback' },
        { key: 'response', label: 'Response' },
        { key: 'createdTimestamp', label: 'Date' }
    ];

    useEffect(() => {
        loadFeedbacks();
    }, []);

    const loadFeedbacks = async () => {
        try {
            setLoading(true);
            const response = await feedbackService.getAllFeedbacks();
            const feedbacksData = response.data || response || [];
            setFeedbacks(feedbacksData);
            setFilteredFeedbacks(feedbacksData);
        } catch (error) {
            console.error('Error loading feedbacks:', error);
            // alert('Failed to load'); // Removed annoying popup
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (column, value) => {
        const filtered = feedbacks.filter(feedback => {
            const fieldValue = column.split('.').reduce((obj, key) => obj?.[key], feedback);
            return fieldValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilteredFeedbacks(filtered);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilteredFeedbacks(feedbacks);
        setCurrentPage(1);
    };

    const handleDeleteClick = (id) => {
        setSelectedFeedbackId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedFeedbackId) {
            try {
                await feedbackService.deleteFeedback(selectedFeedbackId);
                // alert('Feedback deleted successfully');
                loadFeedbacks();
            } catch (error) {
                console.error('Error deleting feedback:', error);
                alert('Failed to delete feedback');
            } finally {
                setIsModalOpen(false);
                setSelectedFeedbackId(null);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFeedbackId(null);
    };

    const handleRespond = (feedbackId) => {
        setRespondingTo(feedbackId);
    };

    const handleResponseChange = (feedbackId, value) => {
        setResponseText(prev => ({
            ...prev,
            [feedbackId]: value
        }));
    };

    const handleSubmitResponse = async (feedbackId) => {
        const response = responseText[feedbackId];
        if (!response || !response.trim()) {
            alert('Please enter a response');
            return;
        }

        try {
            await feedbackService.respondToFeedback({
                id: feedbackId,
                response: response
            });
            alert('Response submitted successfully');
            setRespondingTo(null);
            setResponseText(prev => ({
                ...prev,
                [feedbackId]: ''
            }));
            loadFeedbacks();
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('Failed to submit response');
        }
    };

    // Client-side pagination
    const totalPages = Math.ceil(filteredFeedbacks.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFeedbacks = filteredFeedbacks.slice(startIndex, endIndex);

    return (
        <MainLayout>
            <div className="feedback-list-page">
                <div className="page-header">
                    <h1>💬 Feedback Management</h1>
                    <Button onClick={() => history.push('/feedback/add')} variant="primary">
                        ➕ Submit Feedback
                    </Button>
                </div>

                <div className="page-content">
                    <TableSearch
                        columns={columns}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />

                    {loading ? (
                        <div className="loading-state">Loading feedbacks...</div>
                    ) : (
                        <>
                            <div className="feedback-container">
                                {currentFeedbacks.length > 0 ? (
                                    currentFeedbacks.map(feedback => (
                                        <div key={feedback.id} className="feedback-card">
                                            <div className="feedback-header">
                                                <span className="feedback-id">#{feedback.id}</span>
                                                <span className="feedback-date">{feedback.createdTimestamp}</span>
                                            </div>
                                            <div className="feedback-content">
                                                <p><strong>Feedback:</strong> {feedback.feedback}</p>
                                                {feedback.response && (
                                                    <div className="feedback-response">
                                                        <strong>Response:</strong> {feedback.response}
                                                    </div>
                                                )}
                                            </div>

                                            {respondingTo === feedback.id ? (
                                                <div className="response-form">
                                                    <textarea
                                                        value={responseText[feedback.id] || ''}
                                                        onChange={(e) => handleResponseChange(feedback.id, e.target.value)}
                                                        placeholder="Enter your response..."
                                                        rows="3"
                                                    />
                                                    <div className="response-actions">
                                                        <Button
                                                            size="small"
                                                            variant="secondary"
                                                            onClick={() => setRespondingTo(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            variant="primary"
                                                            onClick={() => handleSubmitResponse(feedback.id)}
                                                        >
                                                            Submit Response
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="feedback-actions">
                                                    {!feedback.response && (
                                                        <Button
                                                            size="small"
                                                            variant="primary"
                                                            onClick={() => handleRespond(feedback.id)}
                                                        >
                                                            💬 Respond
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="small"
                                                        variant="danger"
                                                        onClick={() => handleDeleteClick(feedback.id)}
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">No feedbacks found</div>
                                )}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                pageSize={pageSize}
                                onPageSizeChange={setPageSize}
                                totalItems={filteredFeedbacks.length}
                            />
                        </>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Delete Feedback"
                message="Are you sure you want to delete this feedback? This action cannot be undone."
                confirmText="Delete"
                confirmVariant="danger"
            />
        </MainLayout>
    );
};

export default FeedbackList;
