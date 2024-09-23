export interface Post {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  cover?: string;
  view?: number;
  createAt?: Date;
  updateAt?: Date;
}
