import axios from "axios";

const RECORD_API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/plate`;

class ApiService {
  fetchRecords() {
    return axios.get(RECORD_API_BASE_URL);
  }

  addRecord(plate) {
    return axios.post("" + RECORD_API_BASE_URL, plate);
  }
}

export default new ApiService();
