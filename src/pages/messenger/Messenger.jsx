import { AspectRatioSharp } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try{
        if (user?._id) {
        const res = await axios.get("/conversations/"+user?._id);
        setConversations(res.data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getConversations();
  }, [user])

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations.map((conv) => {
              return <Conversation conversation= {conv} currentUser={user}/>
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write something..."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
