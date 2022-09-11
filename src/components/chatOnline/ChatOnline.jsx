import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div className="chatOnlineFriend" key={onlineFriend._id} onClick={() => handleClick(onlineFriend)}>
          <div className="chatOnlineImgContainer">
            <img
              src={
                onlineFriend.profilePicture
                  ? PF + onlineFriend.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName"> {onlineFriend.username} </span>
        </div>
      ))}
    </div>
  );

}
