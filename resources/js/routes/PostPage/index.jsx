import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../redux/actions";
import PostInfo from "./PostInfo";
import PostComments from "./PostComments";
import AddEntity from "../../components/AddEntity";
import {
  currentPostSelector,
  currentPostCommentsSelector,
  currentPostReset,
  currentPostCommentsReset
} from "../../helpers/selectors";

const PostPage = (props) => {
  const dispatch = useDispatch();
  const postId = props.computedMatch.params.id;

  const post = useSelector(currentPostSelector);
  const postComments = useSelector(currentPostCommentsSelector);

  useEffect(() => {
    dispatch(allActions.postsActions.getPost(postId));
    dispatch(allActions.postsActions.getPostComments(postId));
    return () => {
      dispatch(currentPostReset);
      dispatch(currentPostCommentsReset);
    };
  }, []);

  const addComment = (text) => {
    dispatch(allActions.postsActions.addPostComments(postId, {text}));
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
      />
      <AddEntity
        type="comment"
        placeholder="Share your opinion"
        addFunc={addComment}
      />
      <PostComments
        comments={postComments.data.data}
        loading={postComments.loading}
      />
    </div>
  )
}

export default PostPage;
