import axios from './Axios';

const AUTH_API_URL = "/api/auth";

export default class AuthService {
  public static async login(password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, { password })
    return response;
  }

  public static async logout() {
    const response = await axios.post(`${AUTH_API_URL}/logout`)
    return response.status === 204 ? true : false;
  }

  public static async checkLogin() {
    const response = await axios.get(`${AUTH_API_URL}/check`);
    return response.data
  }
}
