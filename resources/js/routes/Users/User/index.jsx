import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import UserInfo from "./UserInfo";
import EntityList from "../../../components/EntityList";
import allActions from "../../../redux/actions";
import {
  userSelector,
  userPostsSelector,
  profileSelector,
  currentUserReset,
  currentUserPostsReset,
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

  const followUser = () => {
    dispatch(allActions.usersActions.followUser(userId));
  }

  const unFollowUser = () => {
    dispatch(allActions.usersActions.unFollowUser(userId));
  }

  const blockUser = () => {
    dispatch(allActions.usersActions.blockUser(userId));
  }

  const unBlockUser = () => {
    dispatch(allActions.usersActions.unBlockUser(userId));
  }

  const addPost = (text, tags) => {
    dispatch(allActions.usersActions.addUserPost({text, tags}));
  }

  const deletePost = (id) => {
    dispatch(allActions.usersActions.deleteUserPost(id));
  }

  const updatePost = (id, text, tags) => {
    dispatch(allActions.usersActions.updateUserPost(id, {text, tags}));
  }

  const addReactionToPost = (id, reactionType) => {
    dispatch(allActions.usersActions.reactionToUserPost(id, {reactionType}));
  }

  const deleteReactionFromPost = (id) => {
    dispatch(allActions.usersActions.deleteReactionFromUserPost(id));
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
          unFollowFunc={unFollowUser}
          blockFunc={blockUser}
          unBlockFunc={unBlockUser}
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
        <EntityList
          type="post"
          delFunc={deletePost}
          updateFunc={updatePost}
          showDropdown={theSameUser}
          entities={userPosts.data.data}
          getTagsFunc={getTags}
          setReactionFunc={addReactionToPost}
          deleteReactionFunc={deleteReactionFromPost}
        />
      </div>
    </div>
  )
}

export default User;
