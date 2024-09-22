export interface Post {
  title: string;
  content: string;
  author: string;
  category: string;
  createAt?: Date;
  updateAt?: Date;
  tags?: string[];
  cover?: string;
  view?: number;
  readCounter?: string;
}
