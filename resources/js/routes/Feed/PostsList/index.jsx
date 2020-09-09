import React from 'react';
import { Link } from "react-router-dom";
import Post from "../../../components/ListEntity";
import { skeletonPosts } from "../../../helpers/anotherConstants";


const PostsList = ({ posts }) => {

  return (
    <div className="posts-list">
        {(posts && (posts.length !== 0) ? posts : skeletonPosts).map(post => {
          return (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}>
              <Post
                data={post}
                type="post"
              />
            </Link>
          )})
        }
    </div>
  )
};

export default PostsList;
