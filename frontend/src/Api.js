import axios from 'axios'
import { TOKEN_STORAGE_ID } from "./App.js"

const BASE_URL = process.env.REACT_APP_BASE_URL;

class JoblyApi {
    static async request(endpoint, params = {}, verb = "get") {
        // paramsOrData._token = ( // for now, hardcode token for "testing"
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
        // "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
        // "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U");

        let _token = localStorage.getItem(TOKEN_STORAGE_ID);
    
        console.debug("API Call:", endpoint, params, verb);

        let query;

        if (verb === "get") {
          query = axios.get(
            `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
        } else if (verb === "post") {
          query = axios.post(
            `${BASE_URL}/${endpoint}`, { _token, ...params });
        } else if (verb === "patch") {
          query = axios.patch(
            `${BASE_URL}/${endpoint}`, { _token, ...params });
        }

    
        try {
          return (await query).data
        }
    
        catch(err) {
          console.error("API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    
      static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
      }

      static async getCompanies(search) {
        let res = await this.request("companies", { search });
        return res.companies;
      }

      static async getJobs(search) {
        let res = await this.request("jobs", { search });
        return res.jobs;
      }

      static async login(data) {
        let res = await this.request(`login`, data, "post");
        return res.token;
      }

      static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
      }

      static async register(data) {
        let res = await this.request(`users`, data, "post");
        return res.token;
      }

      static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }

      static async applyToJob(id) {
        let res = await this.request(`jobs/${id}/apply`, {}, "post");
        return res.message;
      }
}

export default JoblyApi;