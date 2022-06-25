import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import {Posts} from "../../dummyData"
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect (() => {
    const fetchPosts = async () => {
      const response = await axios.get("posts/timeline/62ad69b81d7eda68323a4965");
      setPosts(response.data);
    }

    fetchPosts();

  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map(p => {
          return <Post key={p._id} post={p} />
        })}

      </div>
    </div>
  )
}
