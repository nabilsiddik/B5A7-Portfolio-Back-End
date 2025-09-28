import AppError from "../../errorHelpers/appError";
import { IBlog } from "./blog.interfaces";

// Create blog
const createBlog = async(blogPayload: IBlog) => {

    const {title, content, featuredImage} = blogPayload

    if(!title || !content || !featuredImage){
        throw new AppError(400, 'Invalid credentials')
    }

    return title

}

export const BlogServices = {
    createBlog
}