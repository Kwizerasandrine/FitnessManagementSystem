import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class DietService {
    // Get all diets
    getAllDiets() {
        return axios.get(API_URL + '/getAllDietItems', { headers: authHeader() })
            .then(response => response.data);
    }

    // Get diet by ID
    getDietById(id) {
        return axios.post(API_URL + '/sindleDiet', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Create new diet
    createDiet(dietData) {
        return axios.post(API_URL + '/addDiet', dietData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Update diet
    updateDiet(dietData) {
        return axios.post(API_URL + '/updateDiet', dietData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete diet
    deleteDiet(id) {
        return axios.post(API_URL + '/deleteDiet', { id }, { headers: authHeader() })
            .then(response => response.data);
    }
}

const dietService = new DietService();
export default dietService;
