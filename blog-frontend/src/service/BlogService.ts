import { PostReqType } from 'src/types';
import axios from './Axios';

const POST_API_URL = `/api/posts`;

export default class BlogService {
  public static async writePost(post: PostReqType) {
    await axios.post(`${POST_API_URL}`, post);
  }

  public static async getPost(id: number) {
    const { data } = await axios.get(`${POST_API_URL}/${id}`);
    return { data };
  }

  public static async getList({ page, tag, search, category }: { page: number, tag: string, search: string, category: string }) {
    const { data, headers } = await axios.get(
      tag
        ? `${POST_API_URL}/?tag=${tag}`
        : search
          ? `${POST_API_URL}/?search=${search}`
          : category
            ? `${POST_API_URL}/?category=${category}`
            : `${POST_API_URL}/?page=${page}`
    );
    const lastpage = headers.lastpage;
    return { data, lastpage };
  }

  public static async deletePost(id: number) {
    await axios.delete(`${POST_API_URL}/${id}`);
  }

  public static async updatePost(id: number, post: PostReqType) {
    await axios.patch(`${POST_API_URL}/${id}`, post);
  }

  public static async searchContent(content: string) {
    const { data } = await axios.get(`${POST_API_URL}/search/${content}`);
    return { data };
  }
}
