import React, {Component} from 'react';

import { DOMAIN } from '/imports/startup/client/routes';

// components
import MessageBox from '/imports/ui/components/MessageBox';

export class TopNav extends Component {

  _minimalizeNavBar(event) {
    event.preventDefault();

    // Toggle special class
    $("body").toggleClass("mini-navbar");

    // Enable smoothly hide/show menu
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
      // Hide menu in order to smoothly turn on when maximize menu
      $('#side-menu').hide();
      // For smoothly turn on menu
      setTimeout(
        function () {
          $('#side-menu').fadeIn(400);
        }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
      $('#side-menu').hide();
      setTimeout(
        function () {
          $('#side-menu').fadeIn(400);
        }, 100);
    } else {
      // Remove all inline style from jquery fadeIn function to reset menu state
      $('#side-menu').removeAttr('style');
    }
  }

  _rightSidebarToggle() {
    $('#right-sidebar').toggleClass('sidebar-open');
  }

  render() {
    const homePageUrl = `http://${DOMAIN}`;
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top gray-bg" role="navigation" style={{marginBottom: 0}}>
          <div className="navbar-header">
            <a id="navbar-minimalize"
               ref="navbarMinimalize"
               className="minimalize-styl-2 btn btn-primary "
               onClick={this._minimalizeNavBar.bind(this)}
            >
              <i className="fa fa-bars"></i>{" "}theLeader.io
            </a>
          </div>
          <ul className="nav navbar-top-links navbar-left">
            <li>
              <a href={homePageUrl}>
                Strive for GREAT Leadership
              </a>
            </li>
          </ul>
          <ul className="nav navbar-top-links navbar-right">
            <MessageBox />
            <li>
              <a href={FlowRouter.url('homePage')}>
                <i className="fa fa-user"></i> View public profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}