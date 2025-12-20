import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class InventoryService {
    // Get all inventory items
    getAllInventoryItems() {
        return axios.get(API_URL + 'getAllInventoryItems', { headers: authHeader() })
            .then(response => response.data);
    }

    // Add inventory item
    addInventoryItem(itemData) {
        return axios.post(API_URL + 'addItemInfo', itemData, { headers: authHeader() })
            .then(response => response.data);
    }
}

const inventoryService = new InventoryService();
export default inventoryService;
