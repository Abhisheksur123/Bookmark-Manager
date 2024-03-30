import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [folder, setFolder] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    // Fetch bookmarks when component mounts
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/bookmarks?userId=${userId}`);
      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const addBookmark = async () => {
    try {
      await axios.post('http://localhost:5000/bookmarks/add', {
        userId,
        url,
        title,
        folder,
        tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to array
      });
      fetchBookmarks(); // Refresh bookmarks after adding
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const handleLogout = () => {
    setUserId('');
    // Add logic to clear user session or token if using authentication
  };

  return (
    <div>
      {userId ? (
        <>
          <h1>Welcome, User {userId}</h1>
          <input type="text" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <input type="text" placeholder="Folder" value={folder} onChange={e => setFolder(e.target.value)} />
          <input type="text" placeholder="Tags (comma-separated)" value={tags} onChange={e => setTags(e.target.value)} />
          <button onClick={addBookmark}>Add Bookmark</button>
          <ul>
            {bookmarks.map(bookmark => (
              <li key={bookmark._id}>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
              </li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => setUserId('dummyUserId')}>Login</button>
      )}
    </div>
  );
};

export default App;
