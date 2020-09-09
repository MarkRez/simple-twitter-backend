import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from "../../redux/actions";
import PostInfo from "./PostInfo";
import PostComments from "./PostComments";
import AddEntity from "../../components/AddEntity";

const PostPage = (props) => {
  const dispatch = useDispatch();
  const postId = props.computedMatch.params.id;

  const post = useSelector(state => state.posts);

  const postNotFound = post.postNotFound;
  const postData = post.currentPost;
  const comments = post.currentPostComments;

  useEffect(() => {
    dispatch (allActions.postsActions.getPost(postId));
    dispatch (allActions.postsActions.getPostComments(postId));
  }, []);

  if (postNotFound) {
    return <h1>Post not found!</h1>
  }

  return (
    <div className="post-page">
        <PostInfo
          post={postData}
        />
        <AddEntity
          type="comment"
        />
        <PostComments
          comments={comments}
        />
    </div>
  )
}

export default PostPage;
