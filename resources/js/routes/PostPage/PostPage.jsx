import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../store/actions";
import PostInfo from "./PostInfo/PostInfo";
import {EntitiesList, AddEntity} from "../../components/EntityComponents";
import {HandleScroll} from "../../components/HelperComponents";
import {
  currentPostSelector,
  currentPostCommentsSelector,
  currentPostReset,
  currentPostCommentsReset
} from "../../store/selectors";

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
      dispatch(allActions.postsActions.getPostComments(postId, scrollPage.current + 1));
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
    <HandleScroll
      onScroll={nextPage}
    >
      <div className="post-page">
        <PostInfo
          post={post.data}
          loading={post.loading}
          onSetReactionClick={addReactionToPost}
          onDeleteReactionClick={deleteReactionFromPost}
        />
        <AddEntity
          type="comment"
          placeholder="Share your opinion"
          onAddClick={addComment}
        />
        <EntitiesList
          entities={postComments.data.data}
        />
      </div>
    </HandleScroll>
  )
}

export default PostPage;
