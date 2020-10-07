import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../store/actions";
import {feedSelector, feedReset} from "../../store/selectors";
import {HandleScroll} from "../../components/HelperComponents";
import {EntitiesList} from "../../components/EntityComponents";

const Feed = () => {
  const dispatch = useDispatch();
  const scrollPage = useRef(1);
  const totalPages = useRef(1);
  const feedIsLoading = useRef(false);
  const feed = useSelector(feedSelector);
  feedIsLoading.current = feed.loading;

  useEffect(() => {
    dispatch(allActions.feedActions.getFeed(scrollPage.current));
    return () => {
      dispatch(feedReset);
    }
  }, []);

  useEffect(() => {
    totalPages.current = feed.data.meta.last_page
  }, [feed])

  const nextPage = () => {
    if (!feedIsLoading.current && !(scrollPage.current + 1 > totalPages.current)) {
      dispatch(allActions.feedActions.getFeed(scrollPage.current + 1));
      scrollPage.current += 1
    }
  }

  const addReactionToPost = (id, reactionType) => {
    dispatch(allActions.feedActions.reactionToFeedPost(id, {reactionType}));
  }

  const deleteReactionFromPost = (id) => {
    dispatch(allActions.feedActions.deleteReactionFromFeedPost(id));
  }

  return (
    <HandleScroll
      onScroll={nextPage}
    >
      <div className="feed-page">
        <EntitiesList
          onSetReactionClick={addReactionToPost}
          onDeleteReactionClick={deleteReactionFromPost}
          entities={feed.data.data}
          type="post"
        />
      </div>
    </HandleScroll>
  )
};

export default Feed;
