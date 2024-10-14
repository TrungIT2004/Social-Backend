import { PostRepository } from "../database/repository/post-repository"
import { Media, processingImages } from "../utils"

export class PostService {
    PostRepository: any 

    constructor() {
        this.PostRepository = new PostRepository()
    }

    uploadPost = async (userid: string, description: string, media: any) => {
        const processedImages = await processingImages(media)

        try {
            const newPost = await this.PostRepository.createPost(userid, description, processedImages)
            return newPost
        } catch(err) {
            console.log(err)
        }
    }
}