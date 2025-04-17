import React, { useState } from 'react';
import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import { useAppContext } from '../contexts/AppContext';

const BlogCard = ({ post }) => {
  const {axios}=useAppContext()
  const {
    _id,
    title,
    content,
    author,
    comments = [],
    likes = [],
    createdAt = new Date().toISOString(),
  } = post;

  const [likeCount, setLikeCount] = useState(likes.length);
  const [hasLiked, setHasLiked] = useState(likes.includes('user-id'));
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const date = new Date(createdAt).toDateString();
  const preview = content?.length > 120 ? content.slice(0, 120) + '...' : content;
  const imageUrl = `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}`;

  const addLike = async () => {
    try {
      const response = await axios.post('/api/user/comment/addLike', { postId: _id });
      if (response.data.success) {
        setHasLiked(!hasLiked);
        setLikeCount(response.data.totalLikes);
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const toggleComments = async () => {
    if (!showComments) {
      try {
        const res = await axios.get(`/api/user/comment/allComments/${_id}`);
        if (res.data.success) {
          setCommentList(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      setIsSubmitting(true);
      const res = await axios.post('/api/user/comment/addComment', {
        comment: newComment,
        postId: _id,
      });
      if (res.data.success) {
        setCommentList([...commentList, res.data.data]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden w-full max-w-md">
      <img src={imageUrl} alt="Blog Preview" className="w-full h-48 object-cover" />

      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{preview}</p>

        <div className="flex items-center justify-start gap-4 text-gray-500 text-sm mt-2">
          <div
            className={`flex items-center gap-1 cursor-pointer ${hasLiked ? 'text-red-500' : 'hover:text-red-500'}`}
            onClick={addLike}
          >
            <FaRegHeart />
            <span>{likeCount}</span>
          </div>
          <div
            className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"
            onClick={toggleComments}
          >
            <FaRegCommentDots />
            <span>{commentList.length || comments.length}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <p>By {author?.name || 'Anonymous'}</p>
          <p>{date}</p>
        </div>

        <button className="text-indigo-600 text-sm font-medium hover:underline mt-2 w-fit">
          Read more →
        </button>

        
        {showComments && (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border rounded px-3 py-1 w-full text-sm"
              placeholder="Add a comment..."
            />
            <button
              onClick={handleAddComment}
              className="bg-indigo-500 text-white text-sm px-4 py-1 rounded hover:bg-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>

            <div className="text-sm text-gray-600 space-y-2">
              {commentList.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                commentList.map((c, i) => (
                  <div key={i} className="border-b pb-1">
                    <strong>{c?.user?.name || 'User'}:</strong> {c.comment}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
