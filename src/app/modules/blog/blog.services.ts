import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/appError";
import { IBlog } from "./blog.interfaces";

// Create blog
const createBlog = async (blogPayload: Partial<IBlog>) => {
  const { title, content, featuredImage, isFeatured, tags } = blogPayload;

  if (!title || !content || !featuredImage || !tags) {
    throw new AppError(400, "Invalid credentials");
  }

  const blog = {
    title,
    content,
    featuredImage,
    isFeatured,
    tags,
    authorId: 2,
  };

  const blogRes = await prisma.blog.create({
    data: blog,
  });

  return blogRes;
};

// get all blog
const getAllBlogs = async () => {
  const allBlogs = await prisma.blog.findMany({
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
  return allBlogs;
};

// get single blogs
const getSingleBlog = async (blogId: number) => {
  if (!blogId) {
    throw new AppError(404, "Blog id not found");
  }
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  // update views
  await prisma.blog.update({
    where: { id: blogId },
    data: {
      view: {
        increment: 1,
      },
    },
  });

  return blog;
};

// update blog
const updateBlog = async (blogId: number, updatedPayload: Partial<IBlog>) => {
  if (!blogId) {
    throw new AppError(404, "Blog id not found");
  }

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  const updatedBlog = await prisma.blog.update({
    where: { id: blogId },
    data: updatedPayload,
  });

  return updatedBlog;
};

// delete blogs
const deleteBlog = async (blogId: number) => {
  if (!blogId) {
    throw new AppError(404, "Blog id not found");
  }

  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  if (!blog) {
    throw new AppError(404, "Blog not found");
  }

  const deletedBlog = await prisma.blog.delete({
    where: { id: blogId },
  });

  return deletedBlog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
