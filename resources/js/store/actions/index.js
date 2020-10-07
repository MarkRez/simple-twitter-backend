import authActions from '../auth/authActions';
import profileActions from "../profile/profileActions";
import postsActions from '../posts/postsActions';
import usersActions from "../user/userActions";
import feedActions from "../feed/feedActions";
import messagesActions from '../messages/messagesActions'

const allActions = {
  profileActions,
  authActions,
  postsActions,
  usersActions,
  feedActions,
  messagesActions,
}

export default allActions;
