import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./App.css";

const videoData = [
  {
    id: 1,
    title: "React: The Documentary",
    description: "The origin story of React",
    thumbnail: "https://via.placeholder.com/150",
    username: "JohnDoe",
  },
  {
    id: 2,
    title: "Introducing React Hooks",
    description: "Learn about React hooks",
    thumbnail: "https://via.placeholder.com/150",
    username: "JaneSmith",
  },
  {
    id: 3,
    title: "React 18 Keynote",
    description: "Latest features in React 18",
    thumbnail: "https://via.placeholder.com/150",
    username: "ReactFan",
  },
];

function VideoItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleShare = () => {
    alert(`Shared: ${video.title}`);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText("");
    }
  };

  return (
    <div className="video-item">
      <img src={video.thumbnail} alt={video.title} className="thumbnail" />
      <div className="video-details">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
        <p className="video-username">Posted by: {video.username}</p>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Start"}
        </button>
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleShare}>Share</button>
        <div className="comments-section">
          <h4>Comments</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={handleCommentSubmit}>Comment</button>
        </div>
      </div>
    </div>
  );
}

function VideoList({ videos }) {
  return (
    <div>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

function SearchBar({ onSearch }) {
  const handleInputChange = useCallback(
    (e) => {
      onSearch(e.target.value);
    },
    [onSearch]
  );

  return (
    <input
      type="text"
      onChange={handleInputChange}
      placeholder="Search videos..."
    />
  );
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [videos, searchText]);

  return (
    <div className={`app-container ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>Vite + React Video List</h1>
      <SearchBar onSearch={setSearchText} />
      <VideoList videos={filteredVideos} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
