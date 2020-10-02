import React from "react";
import { authenticatedLinks, NonAuthenticatedLinks } from '../../helpers/layoutLinks';
import Skeleton from "react-loading-skeleton";
import MenuItem from "./MenuItem/MenuItem";
import './styles/layout.scss';

export const Layout = ({ children, isAuthenticated, user, loading }) => {
  let menuItems = [];
  let links = [];

  if (isAuthenticated !== null) {
    links = isAuthenticated && user ? authenticatedLinks : NonAuthenticatedLinks;

    menuItems = links.map(item => {
        const link = (item.text === 'My page' ? `${item.link}${user.id}` : item.link);
        return <MenuItem
          key={`layout ${item.text}`}
          text={item.text}
          link={link}
          icon={item.icon}
        />
      }
    )
  }

  return (
    <div className="container-fluid layout">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block sidebar">
          <div className="sidebar-sticky p-3">
            <ul className="nav flex-column">
              { isAuthenticated !== null && !loading
                ? menuItems
                : <Skeleton height={25} count={3} />
              }
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                { children }
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
