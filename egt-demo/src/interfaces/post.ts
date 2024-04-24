export interface Post {
  id: string;
  userId: number;
  title: string;
  body: string;
}

export interface PostItemValues  {
  title: string;
  body: string;
}

export interface EditPostProps {
  id: string;
  data: PostItemValues
}

