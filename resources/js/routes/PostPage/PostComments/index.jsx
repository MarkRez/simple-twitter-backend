import React from 'react';
import Comment from "../../../components/ListEntity";
import Post from "../../../components/ListEntity";

const PostComments = ({ comments }) => {
  let commentsList = []

  if (comments) {
    commentsList = comments.map(comment => (
      <Comment
        key={comment.id}
        data={comment}
        type="comment"
      />
    )
    )
  }

  return (
    <div className="post-comments w-100 p-0">
      {commentsList}
    </div>)
}

export default PostComments;
