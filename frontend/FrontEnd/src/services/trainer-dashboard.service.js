import axios from 'axios';

const API_URL = 'http://localhost:8080';

class TrainerDashboardService {

    getTrainerClasses(trainerName) {
        return axios.get(`${API_URL}/getTrainerClasses/${trainerName}`);
    }

    getTrainerMembers(trainerName) {
        return axios.get(`${API_URL}/getTrainerMembers/${trainerName}`);
    }

    getTrainerStats(trainerName) {
        return axios.get(`${API_URL}/getTrainerStats/${trainerName}`);
    }
}

const trainerDashboardService = new TrainerDashboardService();
export default trainerDashboardService;
