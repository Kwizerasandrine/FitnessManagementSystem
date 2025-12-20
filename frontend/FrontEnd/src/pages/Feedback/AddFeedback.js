import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../../components/common/MainLayout';
import Button from '../../components/common/Button';
import feedbackService from '../../services/feedback.service';
import AlertModal from '../../components/common/AlertModal';
import './AddFeedback.css';

const AddFeedback = () => {
    const history = useHistory();
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleChange = (e) => {
        setFeedback(e.target.value);
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback.trim()) {
            setError('Feedback is required');
            return;
        }

        try {
            setLoading(true);
            // Get user from localStorage
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            await feedbackService.postFeedback({
                feedback: feedback,
                userId: user.id
            });

            showAlert('Success', 'Feedback submitted successfully', 'success', () => {
                history.push('/feedback');
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            showAlert('Error', 'Failed to submit feedback', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="add-feedback-page">
                <div className="page-header">
                    <h1>💬 Submit Feedback</h1>
                    <Button onClick={() => history.push('/feedback')} variant="secondary">
                        ← Back to Feedback
                    </Button>
                </div>

                <div className="page-content">
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="form-group">
                            <label htmlFor="feedback">
                                Your Feedback <span className="required">*</span>
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={feedback}
                                onChange={handleChange}
                                className={error ? 'error' : ''}
                                placeholder="Share your thoughts, suggestions, or concerns..."
                                rows="8"
                            />
                            {error && (
                                <span className="error-message">{error}</span>
                            )}
                            <small className="form-hint">
                                Your feedback helps us improve our services. Please be as detailed as possible.
                            </small>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => history.push('/feedback')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Feedback'}
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

export default AddFeedback;
