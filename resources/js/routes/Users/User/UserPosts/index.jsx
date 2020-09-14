import React from "react";
import './userPosts.scss';
import Post from "../../../../components/ListEntity";
import { Link } from "react-router-dom";

const UserPosts = ({ posts, loading, showDropdown, delFunc }) => {
  let postsList = [];

  if (posts) {
    postsList = posts.map(post => {
      return (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}>
          <Post
            delFunc={delFunc}
            showDropdown={showDropdown}
            loading={loading}
            data={post}
            type="post"
          />
        </Link>
      )});
  }

  return (
    <div className="user-posts w-100 p-0">
      {postsList}
    </div>
  )
}

export default UserPosts;
