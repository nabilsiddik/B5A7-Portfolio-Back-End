import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(3, "title is required"),
  description: z.string().min(10, "description is required"),
  thumbnail: z.url("Thumbnail url is required."),
  features: z.string().optional(),
  liveSiteUrl: z.url("Live Site url is required."),
  githubClient: z.url("Github client url is required."),
  githubServer: z.url("Github server url is required."),
});
