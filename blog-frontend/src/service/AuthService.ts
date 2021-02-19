import axios from 'axios';

const AUTH_API_URL = "http://localhost:4000/api/auth";

export default class AuthService {
  public static async login(password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, { password }, {
      withCredentials: true
    })
    return response;
  }

  public static async logout() {
    const response = await axios.post(`${AUTH_API_URL}/logout`, {}, {
      withCredentials: true
    })
      .then(res => res.status === 204 ? true : false);
    return response;
  }

  public static async checkLogin() {
    const response = await axios.get(`${AUTH_API_URL}/check`, {
      withCredentials: true
    });
    return response.data;
  }

}
