// Post Request Type
export type PostReqType = {
  title: string,
  body: string,
  tags: string[],
}

export type PostResType = {
  postId : string,
  publishedDate: string,
  title: string,
  body: string,
  tags: string[],
}