import './rightbar.css'
import { Users } from "../../dummyData";
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try{
        if(user?._id){
          const friendList = await axios.get("/users/friends/" + user?._id);
          setFriends(friendList.data);
        }
      } catch(error) {
        console.log(error);
      }
    }
    getFriends();
  }, [user?._id]);

  const handleClick = async () => {
    try {
      if(followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id
        }); 
        dispatch({type:"UNFOLLOW", payload:user._id})
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id
        }); 
        dispatch({type:"FOLLOW", payload:user._id})
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "gift.png"} alt="" className="birthdayImg" />
          <span className='birthdayText'> 
            <b>Greg wilson</b> and <b>3 other friends</b> have birthday today </span>
        </div>

        <img src={PF + "ad.jpg"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => {
            return <Online key={user.id} user={user}/>
          })}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1 ? "Single" 
                : user.relationship === 0 ? "Married" 
                : "Complicated"}
            </span>
          </div>
        </div>
        <div className="rightbarTitle">User Friends</div>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link 
              to={"/profile/" + friend.username} 
              style={{textDecoration: 'none'}}
              key={friend?._id}
            >
              <div className="rightbarFollowing">
                <img 
                  src={friend.profilePicture 
                        ? PF + friend.profilePicture 
                        : PF + 'person/noAvatar.png'
                      } 
                  alt="" 
                  className="rightbarFollowingImg" 
                />
                <span className="rightbarFollowingName"> {friend.username} </span>
              </div>
            </Link>
          ))}

          </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        { user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
