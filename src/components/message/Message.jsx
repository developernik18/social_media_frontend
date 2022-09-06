import "./message.css";

export default function Message({own}) {
  return (
    <div className={own? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut doloremque officia maiores quisquam repellat vel quas veniam quos. Vel eius alias, maxime repellat fugiat labore? Cupiditate provident earum dignissimos! Adipisci.
        </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
