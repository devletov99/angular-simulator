export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: {
    likes: number;
    dislikes: number;
  };
  views?: number;
  userId?: number;
  isSkeleton?: boolean;
}

export interface IPostsResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}