import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import allActions from "../../../redux/actions";
import {
  userSelector,
  userPostsSelector,
  profileSelector,
  currentUserReset,
  currentUserPostsReset,
  tagsReset
} from "../../../helpers/selectors";
import AddEntity from "../../../components/AddEntity";
import Skeleton from "react-loading-skeleton";
import {getTags} from "../../../api";

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
    return () => {
      dispatch(currentUserReset);
      dispatch(currentUserPostsReset);
    };
  }, [userId]);

  const followUser = (e) => {
    e.preventDefault();
  }

  const addPost = (text, tags) => {
    dispatch(allActions.usersActions.addUserPost({text, tags}));
    dispatch(tagsReset);
  }

  const deletePost = (id) => {
    dispatch(allActions.usersActions.deleteUserPost(id));
  }

  const updatePost = (id, text, tags) => {
    console.log({text, tags})
    dispatch(allActions.usersActions.updateUserPost(id, {text, tags}));
    dispatch(tagsReset);
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
        {theSameUser
        && <AddEntity
          type="post"
          placeholder="Write new post"
          addEntityFunc={addPost}
          showTagsInput={true}
          getTagsFunc={getTags}
        />
        }
        <UserPosts
          type="post"
          delFunc={deletePost}
          updateFunc={updatePost}
          showDropdown={theSameUser}
          loading={userPosts.loading}
          posts={userPosts.data.data}
          getTagsFunc={getTags}
        />
      </div>
    </div>
  )
}

export default User;
