import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

const AddPost = () => {
  const { axios, navigate } = useAppContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/post/addPost", { title, content });
      console.log(data);
      

      if (data.success) {
        console.log(data);
        
        toast.success("Post added successfully");
        navigate("/"); 
      } else {
        toast.error(data.message || "Failed to add post");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Add Post Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            rows="8"
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
