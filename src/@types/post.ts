export interface PostInterface {
  id: string;
  body: string;
  username: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  likes: Array<{
    username: string;
  }>;
}
