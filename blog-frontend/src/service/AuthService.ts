import axios from 'axios';
import { headerOption, AUTH_API_URL } from './ServiceOption';

export default class AuthService {
  public static async login(password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, { password }, headerOption)
    return response;
  }

  public static async logout() {
    const response = await axios.post(`${AUTH_API_URL}/logout`, {}, headerOption)
      .then(res => res.status === 204 ? true : false);
    return response;
  }

  public static async checkLogin() {
    const response = await axios.get(`${AUTH_API_URL}/check`, headerOption);
    return response.data;
  }
}
