import {getQuerySelector, resetRequests} from "@redux-requests/core";
import {FETCH_PROFILE} from "../redux/actions/userActions";
import {FETCH_CURRENT_POST, FETCH_CURRENT_POST_COMMENTS} from "../redux/actions/postsActions";
import {FETCH_USER, FETCH_USER_POSTS} from "../redux/actions/usersActions";
import {FETCH_FEED} from "../redux/actions/feedActions";
import {FETCH_DIALOGS, FETCH_DIALOG_MESSAGES} from "../redux/actions/messagesActions";

const skeletonArr = [{id: "skltn 1"}, {id: "skltn 2"}, {id: "skltn 3"}, {id: "skltn 4"}, {id: "skltn 5"}];

// profile selectors
export const profileSelector = getQuerySelector({type: FETCH_PROFILE, defaultData: false});

// post selectors
export const currentPostSelector = getQuerySelector({type: FETCH_CURRENT_POST, defaultData: false});
export const currentPostCommentsSelector = getQuerySelector({
  type: FETCH_CURRENT_POST_COMMENTS,
  defaultData: {data: skeletonArr.slice(0, 3)}
});
export const currentPostReset = resetRequests([FETCH_CURRENT_POST]);
export const currentPostCommentsReset = resetRequests([FETCH_CURRENT_POST_COMMENTS]);

// users selectors
export const userSelector = getQuerySelector({type: FETCH_USER, defaultData: false});
export const userPostsSelector = getQuerySelector({
  type: FETCH_USER_POSTS,
  defaultData: {data: skeletonArr.slice(0, 3)}
});
export const currentUserReset = resetRequests([FETCH_USER]);
export const currentUserPostsReset = resetRequests([FETCH_USER_POSTS]);

// feed selectors
export const feedSelector = getQuerySelector({
  type: FETCH_FEED,
  defaultData: {data: []}
});
export const feedReset = resetRequests([FETCH_FEED]);

// messages selectors
export const dialogsSelector = getQuerySelector({
  type: FETCH_DIALOGS,
  defaultData: skeletonArr.slice(0, 5)
});
export const dialogMessagesSelector = getQuerySelector({
  type: FETCH_DIALOG_MESSAGES,
  defaultData: {data: []}
});
export const dialogsReset = resetRequests([FETCH_DIALOGS]);
export const dialogMessagesReset = resetRequests([FETCH_DIALOG_MESSAGES]);
