import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class TrainerService {
    // Get all trainers
    getAllTrainers() {
        return axios.get(API_URL + '/getAllTrainers', { headers: authHeader() })
            .then(response => response.data);
    }

    // Create new trainer
    createTrainer(trainerData) {
        return axios.post(API_URL + '/addTrainer', trainerData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Update trainer
    updateTrainer(trainerData) {
        return axios.post(API_URL + '/updateTrainer', trainerData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete trainer
    deleteTrainer(id) {
        return axios.post(API_URL + '/deleteTrainer', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Upload trainer image
    uploadTrainerImage(id, file) {
        const formData = new FormData();
        formData.append('thumbnail', file);
        formData.append('id', id);

        return axios.post(API_URL + '/addTrainerImage', formData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    }
}

const trainerService = new TrainerService();
export default trainerService;
