import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from "../../redux/actions";
import {feedSelector, feedReset} from "../../helpers/selectors";
import HandleScroll from "../../components/HandleScroll";
import EntityList from "../../components/EntityList";

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
    <div className="feed-page">
      <EntityList
        setReactionFunc={addReactionToPost}
        deleteReactionFunc={deleteReactionFromPost}
        entities={feed.data.data}
        type="post"
      />
      <HandleScroll
        handleFunc={nextPage}
      />
    </div>
  )
};

export default Feed;
