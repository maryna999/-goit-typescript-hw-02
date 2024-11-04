export interface Image {
  id: string;
  urls: { regular: string; small: string };
  alt_description: string;
  description?: string;
  user: { name: string };
  likes: number;
}
