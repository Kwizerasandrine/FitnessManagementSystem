import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class MemberPlanService {
    // Get all user plans (for current logged-in user)
    // Get all user plans (for current logged-in user)
    getUserPlans(userId) {
        // Correct usage of userId param if passed, otherwise fallback to localStorage
        const id = userId || localStorage.getItem('id');
        return axios.get(API_URL + `/getUserPlans/${id}`, { headers: authHeader() })
            .then(response => response.data);
    }

    // Get all member plans (admin view) - NOTE: Backend endpoint might not exist, but fixing path syntax anyway
    getAllMemberPlans() {
        return axios.get(API_URL + '/memberplans', { headers: authHeader() })
            .then(response => response.data);
    }

    // Add user plan (subscribe to plan)
    addUserPlan(planData) {
        return axios.post(API_URL + '/addUserPlan', planData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete user plan (unsubscribe)
    deleteUserPlan(planData) {
        return axios.post(API_URL + '/deleteUserPlan', planData, { headers: authHeader() })
            .then(response => response.data);
    }
}

const memberPlanService = new MemberPlanService();
export default memberPlanService;
