import { FlowRouter } from 'meteor/kadira:flow-router';
import React, {Component} from 'react';

class Navigation extends Component {

  constructor() {
    super();

    this.state = {
      menuItems: [
        {route: 'landingPage', path: '/', label: 'Home', icon: 'fa fa-dashboard'},
        {route: 'app.profile', path: FlowRouter.url('app.profile'), label: 'Profile', icon: 'fa fa-user'},
        {route: 'app.organizations', path: FlowRouter.url('app.organizations'), label: 'Organizations', icon: 'fa fa-sitemap'},
        {route: 'app.employees', path: FlowRouter.url('app.employees'), label: 'Employees', icon: 'fa fa-users'},
        {route: '', path: '', label: 'Feedback', icon: 'fa fa-gift'},
        {route: '', path: '', label: 'Measure', icon: 'fa fa-info'},
      ]
    };
  }

  componentDidMount() {

  }

  render() {
    const {activeRoute} = this.props;

    return (
      <nav id="left-nav" className="left-nav">
        <a href="#" className="logo">L+</a>
        <ul>
          {this.state.menuItems.map((menu, key) => (
            <li key={key} className={menu.route == activeRoute ? 'active' : ''}>
              <a href={menu.path}>
                <i className={menu.icon}></i>
                <span>{menu.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navigation;