import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import allActions from "../../../redux/actions";
import {profileSelector} from "../../../helpers/selectors";

const User = (props) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;

  const currentUser = useSelector(profileSelector);
  const user = useSelector(state => state.users)
  const userData = user.user;
  const userPosts = user.userPosts;
  const userNotFound = user.userNotFound;

  let theSameUser = undefined;
  if (currentUser.data) {
    theSameUser = (currentUser.data.id === userData.id);
  }

  useEffect(() => {
    dispatch (allActions.usersActions.getUser(userId));
    dispatch (allActions.usersActions.getUserPosts(userId));
  }, [userId]);

  const followUser = (e) => {
    e.preventDefault();
  }

  if (userNotFound) {
    return (
      <div className="w-100 text-center">
        <h1>User not found :(</h1>
      </div>
    )
  }

  return (
    <div className="user-page">
        <div className="row">
          <UserInfo
            userData={userData}
            theSameUser={theSameUser}
            followFunc={followUser  }
          />
          <UserPosts
            name={userData.name}
            login={userData.login}
            avatar={userData.avatar}
            posts={userPosts}
          />
        </div>
    </div>
  )
}

export default User;
