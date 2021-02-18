import axios from 'axios';

const AUTH_API_URL = "http://localhost:4000/api/auth";

export default class AuthService {
  public static async login(password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, { password });
    return response.data;
  }

  public static async logout() {
    const response = await axios.post(`${AUTH_API_URL}/logout`);
    return response.data;
  }

  public static async checkLogin() {
    const response = await axios.get(`${AUTH_API_URL}/check`);
    return response.data;
  }

}
