import React from "react";
import './userPosts.scss';
import Post from "../../../../components/ListEntity";
import { Link } from "react-router-dom";

const UserPosts = ({ posts, loading, showDropdown, delFunc, updateFunc, type, getTagsFunc, tagsList }) => {
  let postsList = [];

  if (posts) {
    postsList = posts.map(post => {
      return (
          <Post
            key={post.id}
            updateFunc={updateFunc}
            delFunc={delFunc}
            showDropdown={showDropdown}
            loading={loading}
            data={post}
            type={type}
            getTagsFunc={getTagsFunc}
            tagsList={tagsList}
          />
      )});
  }

  return (
    <div className="user-posts w-100 p-0">
      {postsList}
    </div>
  )
}

export default UserPosts;
