import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';

const SinglePost = () => {
  const { id } = useParams();
  const { axios, user } = useAppContext();

  const [post, setPost] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/user/post/${id}`);
      if (res.data.success) {
        setPost(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching post:', err.message);
      toast.error('Error fetching post.');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/user/comment/allComments/${id}`);
      if (res.data.success) {
        setCommentList(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err.message);
      toast.error('Error fetching comments.');
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      setIsSubmitting(true);
      const res = await axios.post(`/api/user/comment/addComment`, {
        comment: newComment,
        postId: id,
      });
      if (res.data.success) {
        const commentWithUser = {
          ...res.data.data,
          user: {
            name: user?.name || 'You',
          },
        };
        setCommentList([...commentList, commentWithUser]);
        setNewComment('');
      } else {
        toast.error('Failed to add comment.');
      }
    } catch (err) {
      console.error('Error adding comment:', err.message);
      toast.error('Error adding comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <div className="text-center py-10">Loading post...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-10 max-w-7xl mx-auto mt-16">
      {/* Left Section - Blog Content */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <img
          src={`https://picsum.photos/800/300?random=${Math.floor(Math.random() * 1000)}`}
          alt="cover"
          className="rounded mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {post?.author?.name || 'Anonymous'} • {new Date(post.createdAt).toDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>

      {/* Right Section - Comments */}
      <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <div className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-2">
          {loadingComments ? (
            <p className="text-gray-500 text-sm">Loading comments...</p>
          ) : commentList.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          ) : (
            commentList.map((comment, i) => (
              <div key={i} className="border-b pb-1">
                <strong className="text-sm">{comment?.user?.name || 'User'}:</strong>{' '}
                <span className="text-sm text-gray-700">{comment.comment}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
            placeholder="Add a comment..."
            disabled={isSubmitting}
          />
          <button
            onClick={handleAddComment}
            className="bg-indigo-500 text-white text-sm px-4 py-2 rounded hover:bg-indigo-600 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
