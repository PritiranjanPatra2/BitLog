import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})
const Post =mongoose.model('Post',postSchema);
export default Post;