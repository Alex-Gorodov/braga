export type Post = {
  id: number;
  title: string;
  name: string;
  post: string;
  date: Date;
  tags: string[];
  img?: string;
  video?: string;
  likes: number;
}
