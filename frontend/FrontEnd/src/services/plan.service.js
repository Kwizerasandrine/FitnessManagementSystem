import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class PlanService {
    // Get all plans
    getAllPlans() {
        return axios.get(API_URL + '/getAllPlans', { headers: authHeader() })
            .then(response => response.data);
    }

    // Get plan by ID
    getPlanById(id) {
        return axios.post(API_URL + '/singlePlan', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Create new plan
    createPlan(planData) {
        return axios.post(API_URL + '/createPlan', planData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Update plan
    updatePlan(planData) {
        return axios.post(API_URL + '/updatePlan', planData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete plan
    deletePlan(id) {
        return axios.post(API_URL + '/deletePlan', { id }, { headers: authHeader() })
            .then(response => response.data);
    }
}

const planService = new PlanService();
export default planService;
