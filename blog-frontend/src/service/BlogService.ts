import { PostReqType } from 'src/types';
import axios from './Axios';

const POST_API_URL = `/api/posts`;

export default class BlogService {
  public static async writePost(post: PostReqType) {
    const response = await axios.post(`${POST_API_URL}`, post);
    return response.data;
  }

  public static async getPost(id: number) {
    const response = await axios.get(`${POST_API_URL}/${id}`);
    return response.data;
  }

  public static async getList(page: number, tag?: string, search?: string) {
    const response = await axios.get(
      tag
        ? `${POST_API_URL}/?tag=${tag}`
        : search
          ? `${POST_API_URL}/?search=${search}`
          : `${POST_API_URL}/?page=${page}`
    );
    return response;
  }

  public static async getPostList() {
    const response = await axios.get(`${POST_API_URL}/`);
    return response;
  }

  public static async deletePost(id: number) {
    const response = await axios.delete(`${POST_API_URL}/${id}`);
    return response.data;
  }

  public static async updatePost(id: number, post: PostReqType) {
    const response = await axios.patch(`${POST_API_URL}/${id}`, post);
    return response.data;
  }

  public static async searchContent(content: string) {
    const response = await axios.get(`${POST_API_URL}/search/${content}`);
    return response.data;
  }
}
