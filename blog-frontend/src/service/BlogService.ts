import axios from 'axios';
import { PostReqType } from 'src/types';
import { POST_API_URL, headerOption } from './ServiceOption';

export default class BlogService {
  public static async writePost(post: PostReqType) {
    const response = await axios.post(`${POST_API_URL}`, post, headerOption);
    return response.data;
  }

  public static async getPost(id: number) {
    const response = await axios.get(`${POST_API_URL}/${id}`, headerOption);
    return response.data;
  }

  public static async getList(page: number, tag?: string) {
    const response = await axios.get(tag ? `${POST_API_URL}/?tag=${tag}` : `${POST_API_URL}/?page=${page}`, headerOption);
    return response;
  }

  public static async getPostList() {
    const response = await axios.get(`${POST_API_URL}/`, headerOption);
    return response;
  }

  public static async deletePost(id: number) {
    const response = await axios.delete(`${POST_API_URL}/${id}`, headerOption);
    return response.data;
  }

  public static async updatePost(id: number, post: PostReqType) {
    const response = await axios.patch(`${POST_API_URL}/${id}`, post, headerOption);
    return response.data;
  }
}
