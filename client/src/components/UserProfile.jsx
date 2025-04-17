import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user/comment/seeProfile/${id}`);
        setProfile(response.data.profile);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch profile or posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  // If no profile, generate a random profile for demo purposes
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // Simulate random user profile if there's an error
    setProfile({
      name: `User ${Math.floor(Math.random() * 1000)}`,
      bio: `Random bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac elit ut lorem venenatis bibendum.`,
      profileImage: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`
    });
    setPosts([
      {
        _id: '1',
        title: 'Random Blog Post 1',
        content: 'This is a random post to simulate blog posts from the user.',
        author: { name: 'Random Author' },
        comments: [],
        likes: 0,
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        title: 'Random Blog Post 2',
        content: 'This is another random post to simulate more content.',
        author: { name: 'Random Author' },
        comments: [],
        likes: 5,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  return (
    <div className="container mx-auto p-5 mt-16">
      {/* User Profile Info */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-6 flex gap-8">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg">
          <img
            src={profile?.profileImage || `https://randomuser.me/api/portraits/men/1.jpg`}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-gray-800">{profile?.name}</h1>
          <p className="text-sm text-gray-500 mt-2">{profile?.bio || 'No bio available'}</p>
        </div>
      </div>

      {/* User's Blog Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
