import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../store/actions";
import PostInfo from "./PostInfo";
import AddEntity from "../../components/AddEntity";
import {
  currentPostSelector,
  currentPostCommentsSelector,
  currentPostReset,
  currentPostCommentsReset
} from "../../store/selectors";
import EntityList from "../../components/EntityList";
import HandleScroll from "../../components/HandleScroll";

const PostPage = (props) => {
  const dispatch = useDispatch();
  const postId = props.computedMatch.params.id;
  const scrollPage = useRef(1);
  const totalPages = useRef(1);
  const commentsIsLoading = useRef(false);

  const post = useSelector(currentPostSelector);
  const postComments = useSelector(currentPostCommentsSelector);
  commentsIsLoading.current = postComments.loading;

  useEffect(() => {
    totalPages.current = postComments.data.meta.last_page
  }, [postComments])

  useEffect(() => {
    dispatch(allActions.postsActions.getPost(postId));
    dispatch(allActions.postsActions.getPostComments(postId, scrollPage.current));
    return () => {
      dispatch(currentPostReset);
      dispatch(currentPostCommentsReset);
    };
  }, []);

  const nextPage = () => {
    if (!commentsIsLoading.current && !(scrollPage.current + 1 > totalPages.current)) {
      dispatch(allActions.postsActions.getPostComments(postId ,scrollPage.current + 1));
      scrollPage.current += 1
    }
  }

  const addComment = (text) => {
    dispatch(allActions.postsActions.addPostComments(postId, {text}));
  }

  const addReactionToPost = (reactionType) => {
    dispatch(allActions.postsActions.reactionToPost(postId, {reactionType}));
  }

  const deleteReactionFromPost = () => {
    dispatch(allActions.postsActions.deleteReactionFromPost(postId));
  }

  if (post.error) {
    return post.error.response.status === 404
      ? <h1>Post not found!</h1>
      : <h1>Internal server error!</h1>
  }

  return (
    <div className="post-page">
      <PostInfo
        post={post.data}
        loading={post.loading}
        setReactionFunc={addReactionToPost}
        deleteReactionFunc={deleteReactionFromPost}
      />
      <AddEntity
        type="comment"
        placeholder="Share your opinion"
        addEntityFunc={addComment}
      />
      <EntityList
        entities={postComments.data.data}
      />
      <HandleScroll
        handleFunc={nextPage}
      />
    </div>
  )
}

export default PostPage;
