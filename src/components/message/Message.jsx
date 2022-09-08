import "./message.css";
import {format} from 'timeago.js';

export default function Message({message, own}) {
  return (
    <div className={own? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          {message?.text}
        </p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}
