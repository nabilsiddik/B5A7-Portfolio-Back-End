export interface IProject {
  id?: number;
  title: string;
  description: string;
  thumbnail: string;
  liveSite: string;
  features: string[];
  githubClient: string;
  githubServer: string;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
