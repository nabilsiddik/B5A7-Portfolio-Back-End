import { prisma } from "../../config/db.config";
import AppError from "../../errorHelpers/appError";
import { IBlog } from "./blog.interfaces";

// Create blog
const createBlog = async(blogPayload: Partial<IBlog>) => {

    const {title, content, featuredImage, isFeatured, tags} = blogPayload

    if(!title || !content || !featuredImage || !tags){
        throw new AppError(400, 'Invalid credentials')
    }

    const blog = {
        title,
        content,
        featuredImage,
        isFeatured,
        tags,
        authorId: 2,
    }

    const blogRes = await prisma.blog.create({
        data: blog
    })

    return blogRes

}

export const BlogServices = {
    createBlog
}