import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import allActions from "../../../redux/actions";
import {userSelector, userPostsSelector, profileSelector} from "../../../helpers/selectors";
import AddEntity from "../../../components/AddEntity";
import Skeleton from "react-loading-skeleton";

const User = (props) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;

  const user = useSelector(userSelector);
  const userPosts = useSelector(userPostsSelector);
  const currentUser = useSelector(profileSelector);

  let theSameUser = undefined;
  if (currentUser.data && user.data) {
    theSameUser = (currentUser.data.id === user.data.id);
  }

  useEffect(() => {
    dispatch(allActions.usersActions.getUser(userId));
    dispatch(allActions.usersActions.getUserPosts(userId));
  }, [userId]);

  const followUser = (e) => {
    e.preventDefault();
  }

  if (user.error) {
    return user.error.response.status === 404
      ? <h1>User not found!</h1>
      : <h1>Internal server error!</h1>
  }

  return (
    <div className="user-page">
      <div className="row">
        <UserInfo
          userData={user.data}
          loading={user.loading}
          theSameUser={theSameUser}
          followFunc={followUser}
        />
        <h2>{user.data.name ? `${user.data.name} posts` : <Skeleton/>}</h2>
        { theSameUser
          && <AddEntity
            loading={userPosts.loading}
          />
        }
        <UserPosts
          loading={userPosts.loading}
          posts={userPosts.data.data}
        />
      </div>
    </div>
  )
}

export default User;
