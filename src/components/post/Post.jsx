import "./post.css";
import {MoreVert} from "@mui/icons-material";
import { useState } from "react";

export default function Post({post}) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/person/1.jpg" alt="" className="postProfileImg"/>
            <span className="postUserName">Rohan</span>
            <span className="postDate"> {post.date} </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">
            {post?.desc}
          </span>
          <img className="postImg" src={PF + post.photo} alt="" />

        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img 
              className="likeIcon" 
              src="/assets/like.png" alt="" 
              onClick={handleLike}
              />
            <img 
              className="likeIcon" 
              src="/assets/heart.png" alt="" 
              onClick={handleLike}  
              />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"> {post.comment}  comments </span>
          </div>
        </div>

      </div>
    </div>
  )
}
