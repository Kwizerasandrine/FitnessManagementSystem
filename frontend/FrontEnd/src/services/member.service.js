import axios from 'axios';
import { API_URL } from '../components/common/URL';
import authHeader from '../components/services/auth-header';

class MemberService {
    // Get all members with pagination
    // Note: The backend seems to ignore page/size in other RPC calls, so we might just get all and let frontend paginate.
    // Converting to getAllMembers to match pattern.
    // Get all members with pagination
    // Get all members with pagination
    getAllMembers(page = 0, size = 10) {
        return axios.get(API_URL + '/getallusers', { headers: authHeader() })
            .then(response => response.data);
    }

    // Get member by ID
    getMemberById(id) {
        return axios.post(API_URL + '/getUser', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Create new member
    createMember(memberData) {
        return axios.post(API_URL + '/signup', memberData, { headers: authHeader() })
            .then(response => response.data);
    }

    // Update member
    updateMember(id, memberData) {
        const data = { ...memberData, id };
        // Trying lowercase 'updateuser' based on 'deleteuser' pattern
        return axios.post(API_URL + '/updateuser', data, { headers: authHeader() })
            .then(response => response.data);
    }

    // Delete member
    deleteMember(id) {
        return axios.post(API_URL + '/deleteuser', { id }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Get members by location
    getMembersByLocation(locationId) {
        return axios.post(API_URL + 'getUsersByLocation', { locationId }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Get members by province
    getMembersByProvince(provinceCode) {
        return axios.post(API_URL + 'getUsersByProvince', { provinceCode }, { headers: authHeader() })
            .then(response => response.data);
    }

    // Search members
    searchMembers(searchTerm) {
        // Pattern: potentially just filtering on frontend if getAllMembers returns all.
        // Or searchMembers endpoint.
        return axios.post(API_URL + 'searchMembers', { searchTerm }, { headers: authHeader() })
            .then(response => response.data);
    }
}

const memberService = new MemberService();
export default memberService;
