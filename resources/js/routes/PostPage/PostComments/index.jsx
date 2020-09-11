import React from 'react';
import Comment from "../../../components/ListEntity";

const PostComments = ({ comments, loading }) => {
  let commentsList = []

  if (comments) {
    commentsList = comments.map(comment => (
      <Comment
        loading={loading}
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
