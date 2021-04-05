// Post Request Type
export type PostReqType = {
  title: string,
  body: string,
  tags: string[],
  category: string,
}

// Post Response Type
export type PostResType = {
  postId: string,
  publishedDate: string,
  updatedDate: string,
  title: string,
  body: string,
  tags: string[],
  category: string,
}