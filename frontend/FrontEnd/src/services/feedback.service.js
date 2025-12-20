import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class FeedbackService {
    // Get all feedbacks
    getAllFeedbacks() {
        return axios.get(API_URL + '/getAllfeedbacks', { headers: authHeader() })
            .then(response => response.data);
    }

    // Get user feedbacks
    getUserFeedbacks(userId) {
        return axios.get(API_URL + `/getUserFeedbacks/${userId}`, { headers: authHeader() })
            .then(response => response.data);
    }

    // Post feedback
    postFeedback(feedbackData) {
        return axios.post(API_URL + '/postfeedback', feedbackData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete feedback
    deleteFeedback(id) {
        return axios.post(API_URL + '/deletefeedback', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Respond to feedback
    respondToFeedback(feedbackData) {
        return axios.post(API_URL + '/feedbackResponse', feedbackData, { headers: authHeader() })
            .then(response => response.data);
    }
}

const feedbackService = new FeedbackService();
export default feedbackService;
