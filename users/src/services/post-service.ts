import { Post, PostRepository } from "../database/repository/post-repository"
import { Media, processingImages } from "../utils"

export class PostService {
    PostRepository: any 

    constructor() {
        this.PostRepository = new PostRepository()
    }

    getPosts = async (): Promise<Post[] | undefined> => {
        try {
            const posts = await this.PostRepository.selectPosts()
            return posts
        } catch(err) {
            console.log(err)
            return 
        }
    }

    getPostById = async (postid: string): Promise<Post | undefined> => {
        try {
            const post = await this.PostRepository.selectOnePost(postid)
            console.log(post)
            return post
        } catch(err) {
            console.log(err)
            return 
        }
    }

    uploadPost = async (userid: string, description: string, media: any): Promise<Post | undefined> => {
        const processedImages = await processingImages(media)

        try {
            const newPost = await this.PostRepository.createPost(userid, description, processedImages)
            return newPost
        } catch(err) {
            console.log(err)
            return 
        }
    }

    deletePost = async (postid: string, userid: string): Promise<undefined> => {
        const post = await this.getPostById(postid)

        if (typeof post === 'object') {
            if(post.userid === userid) {
                try {
                    await this.PostRepository.deletePost(postid)
                    return 
                } catch(err) {
                    console.log(err)
                    return 
                }   
            } else {
                console.log('Cant delete others posts')
                return 
            }
        }

    }
}