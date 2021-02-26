import Axios from 'axios';

// cookie 허용
const headerOption = {
  withCredentials: true,
}

const axios = Axios.create({
  baseURL: "https://soojeonghan.gq",
  headers: headerOption,
})

export default axios;
