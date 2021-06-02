import { PostReqType } from 'src/types';
import axios from './Axios';
import qs from 'query-string';

const POST_API_URL = '/api/posts';

export default class BlogService {
  public static async writePost(post: PostReqType) {
    await axios.post(POST_API_URL, post);
  }

  public static async getPost(id: string) {
    const { data } = await axios.get(POST_API_URL + `/${id}`);
    return { data };
  }

  public static async getList(query: any, page: number) {
    const url = POST_API_URL + `/?${query}&page=${page}`;
    const { data, headers } = await axios.get(url);
    const lastpage = headers.lastpage;
    return { data, lastpage };
  }

  public static async deletePost(id: number) {
    await axios.delete(POST_API_URL + `/${id}`);
  }

  public static async updatePost(id: number, post: PostReqType) {
    await axios.patch(POST_API_URL + `/${id}`, post);
  }

  public static async getSearch(search: string) {
    const query = qs.stringify({ search });
    const { data } = await axios.get(POST_API_URL + `/?${query}`);
    return { data };
  }
}
