import axios from 'axios';
import { PostReqType } from 'src/types';

const BLOG_API_URL = "http://localhost:4000";

export default class BlogService {
  public static async writePost(post: PostReqType) {
    const response = await axios.post(`${BLOG_API_URL}/api/posts`, post);
    return response.data;
  }

  public static async getPost(id: number) {
    const response = await axios.get(`${BLOG_API_URL}/api/posts/${id}`);
    return response.data;
  }

  public static async getList(page: number, tag?: string) {
    const response = await axios.get(tag ? `${BLOG_API_URL}/api/posts/?tag=${tag}` : `${BLOG_API_URL}/api/posts/?page=${page}`);
    return response;
  }

  public static async getPostList() {
    const response = await axios.get(`${BLOG_API_URL}/api/posts/`);
    return response;
  }

  public static async deletePost(id: number) {
    const response = await axios.delete(`${BLOG_API_URL}/api/posts/${id}`);
    return response.data;
  }

  public static async updatePost(id: number, post: PostReqType) {
    console.log(id);
    const response = await axios.patch(`${BLOG_API_URL}/api/posts/${id}`, post);
    return response.data;
  }
}
