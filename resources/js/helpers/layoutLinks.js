import { ROUTES } from "./routes";
import { faUser, faEnvelope, faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt, faUserPlus, faUnlock } from '@fortawesome/free-solid-svg-icons';

export const authenticatedLinks = [
  {
    text: 'My page',
    link: '/users/',
    icon: faUser
  },
  {
    text: 'Messages',
    link: ROUTES.MESSAGES,
    icon: faEnvelope
  },
  {
    text: 'Feed',
    link: ROUTES.FEED,
    icon: faListAlt
  },
];

export const NonAuthenticatedLinks = [
  {
    text: 'Login',
    link: ROUTES.LOGIN,
    icon: faSignInAlt
  },
  {
    text: 'Registration',
    link: ROUTES.REGISTRATION,
    icon: faUserPlus
  },
  {
    text: 'Password recovery',
    link: ROUTES.RECOVERY,
    icon: faUnlock
  },
];
