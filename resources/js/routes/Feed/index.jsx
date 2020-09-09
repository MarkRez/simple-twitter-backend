import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../redux/actions";
import PostsList from "./PostsList";
import HandleScroll from "../../components/HandleScroll";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed);
  const feedPosts = feed.feedPosts;
  const feedIsLoading = feed.feedLoading;

  useEffect(()=> {
    dispatch(allActions.feedActions.getFeed());
  }, [])

  return (
    <div className="feed-page">
      <HandleScroll
        handleFunc={()=>dispatch(allActions.feedActions.nextPage())}
      />
      <PostsList
        posts={feedPosts}
      />
      {feedIsLoading && "Loading ..."}
    </div>
  )
};

export default Feed;
