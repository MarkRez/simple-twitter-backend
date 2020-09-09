import React from "react";
import './userPosts.scss';
import Post from "../../../../components/ListEntity";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const UserPosts = ({ posts, login, name, avatar }) => {
  let postsList = [];

  if (posts) {
    postsList = posts.map(post => {
      post.user = { login, name, avatar }
      return (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}>
          <Post
            data={post}
            type="post"
          />
        </Link>
      )});
  }

  return (
    <div className="user-posts w-100 p-0">
      <h2>{name ? `${name} posts` : <Skeleton />}</h2>
      {postsList}
    </div>
  )
}

export default UserPosts;
