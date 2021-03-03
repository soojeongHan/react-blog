import axios from './Axios';

const AUTH_API_URL = "/api/auth";

export default class AuthService {
  public static async login(password: string) {
    const response = await axios.post(`${AUTH_API_URL}/login`, { password })
    console.log(response);
    console.dir(response);
    return response;
  }

  public static async logout() {
    const response = await axios.post(`${AUTH_API_URL}/logout`, {})
      .then(res => res.status === 204 ? true : false);
    return response;
  }

  public static async checkLogin() {
    const response = await axios.get(`${AUTH_API_URL}/check`);
    console.log(response);
    return response.data;
  }
}
