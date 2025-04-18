import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'name') 
            .populate('comments');
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getSinglePost=async (req,res)=>{
    try {
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.json({
                success:false,
                message:"Post not found"
            })
        }
        res.json({
            success:true,
            data:post
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}
export const addPost=async (req,res)=>{
    try {
        const {title,content}=req.body;
        const author=req.userId;
        console.log(author);
        
        const post=new Post({title,content,author})
        await post.save();
        res.json({
            success:true,
            message:"Post created successfully",
            data:post
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}

