import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class LocationService {
  // Get all provinces (root locations)
  getProvinces() {
    return axios.get(API_URL + '/api/locations/provinces', { headers: authHeader() })
      .then(response => response.data);
  }

  // Get children of a location by parent ID and type
  getChildren(parentId, type) {
    let url = API_URL + `/api/locations/${parentId}/children`;
    if (type) {
      url += `?type=${type}`;
    }
    return axios.get(url, { headers: authHeader() })
      .then(response => response.data);
  }

  // Get location by ID
  getLocationById(id) {
    return axios.get(API_URL + `/api/locations/${id}`, { headers: authHeader() })
      .then(response => response.data);
  }

  // Get location by code
  getLocationByCode(code) {
    return axios.get(API_URL + `/api/locations/code/${code}`, { headers: authHeader() })
      .then(response => response.data);
  }

  // Get all locations with pagination
  getAllLocations(page = 0, size = 10, sortBy = 'name') {
    return axios.get(API_URL + `/api/locations?page=${page}&size=${size}&sortBy=${sortBy}`, { headers: authHeader() })
      .then(response => response.data);
  }

  // Get locations by type
  getLocationsByType(type) {
    return axios.get(API_URL + `/api/locations/type/${type}`, { headers: authHeader() })
      .then(response => response.data);
  }

  // Create new location
  createLocation(locationData) {
    return axios.post(API_URL + '/api/locations', locationData, { headers: authHeader() })
      .then(response => response.data);
  }

  // Update location
  updateLocation(id, locationData) {
    return axios.put(API_URL + `/api/locations/${id}`, locationData, { headers: authHeader() })
      .then(response => response.data);
  }

  // Delete location
  deleteLocation(id) {
    return axios.delete(API_URL + `/api/locations/${id}`, { headers: authHeader() })
      .then(response => response.data);
  }

  // Search locations by name
  searchLocations(name) {
    return axios.get(API_URL + `/api/locations/search?name=${name}`, { headers: authHeader() })
      .then(response => response.data);
  }
}

const locationService = new LocationService();
export default locationService;
