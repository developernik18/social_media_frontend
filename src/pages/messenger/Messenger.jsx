import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (user?._id) {
          const res = await axios.get("/conversations/" + user?._id);
          setConversations(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/"+currentChat?._id);
        console.log(res);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  },[messages])

  const handleSubmit =async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    try {
      const res = await axios.post('messages', message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error``)
    }
  }

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
              return (
                <div onClick={() => setCurrentChat(conv)} key={conv._id}>
                  <Conversation
                    conversation={conv}
                    currentUser={user}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}> 
                      <Message message={m} own={m?.sender === user?._id} />                  
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    value= {newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value)
                    }}
                    
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversation"> Open a Conversation to start a chat </span>
            )}
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
