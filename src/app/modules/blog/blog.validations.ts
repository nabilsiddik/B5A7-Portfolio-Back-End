import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  featuredImage: z.string().url("Featured image must be a valid URL"),
  isFeatured: z.boolean(),
  tags: z.string(),
});
