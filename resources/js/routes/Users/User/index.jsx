import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import UserInfo from "./UserInfo";
import EntityList from "../../../components/EntityList";
import allActions from "../../../store/actions";
import {
  userSelector,
  userPostsSelector,
  profileSelector,
  currentUserReset,
  currentUserPostsReset,
} from "../../../store/selectors";
import AddEntity from "../../../components/AddEntity";
import Skeleton from "react-loading-skeleton";
import {getTags} from "../../../api";
import HandleScroll from "../../../components/HandleScroll";
import ErrorComponent from "../../../components/ErrorComponent";

const User = (props) => {
  const dispatch = useDispatch();
  const userId = props.computedMatch.params.id;
  const scrollPage = useRef(1);
  const totalPages = useRef(1);
  const postsIsLoading = useRef(false);

  const user = useSelector(userSelector);
  const userPosts = useSelector(userPostsSelector);
  const currentUser = useSelector(profileSelector);
  postsIsLoading.current = userPosts.loading;

  useEffect(() => {
    totalPages.current = userPosts.data.meta.last_page
  }, [userPosts])

  useEffect(() => {
    dispatch(allActions.usersActions.getUser(userId));
    dispatch(allActions.usersActions.getUserPosts(userId, scrollPage.current));
    return () => {
      dispatch(currentUserReset);
      dispatch(currentUserPostsReset);
    };
  }, [userId]);

  const nextPage = () => {
    if (!postsIsLoading.current && !(scrollPage.current + 1 > totalPages.current)) {
      dispatch(allActions.usersActions.getUserPosts(userId ,scrollPage.current + 1));
      scrollPage.current += 1
    }
  }

  let theSameUser = undefined;
  if (currentUser.data && user.data) {
    theSameUser = (currentUser.data.id === user.data.id);
  }

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
    let message = '';
    switch (user.error.response.status) {
      case 403:
        message = user.error.response.data;
        break;
      case 404:
        message = 'User not found!';
        break;
      default:
        message = 'Internal server error!'
    }
    return <ErrorComponent>{message}</ErrorComponent>
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
          <HandleScroll
            handleFunc={nextPage}
          />
        </div>
      </div>
    )
  }

  export default User;
