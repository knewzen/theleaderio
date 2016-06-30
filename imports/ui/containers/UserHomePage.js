import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Profiles } from '/imports/api/profiles/index';
import * as SubdomainActions from '/imports/utils/subdomain';
import { signinRoute } from '/imports/startup/client/routes';
import Spinner from '/imports/ui/common/Spinner';

class UserHomePage extends Component {
  constructor() {
    super();

    this.state = {
      notification: null
    };
  }

  componentWillMount() {
    
  }

  render() {
    const { isLoading, profiles } = this.props;
    console.log(profiles);
    if(isLoading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <h4>test</h4>
        </div>
      );
    }
  }
}

const meteorData = params => {
  const userId = Meteor.userId();
  const sub = Meteor.subscribe('profiles');
  console.log(`subscribe profiles: ${sub.ready()} & userId: ${userId}`);
  if(!_.isEmpty(Meteor.user())) {
    const alias = SubdomainActions.getSubdomain();
    const username = Meteor.user().username;
    if(alias !== username) {
      // this.setState({
      //   notification: `Wrong user for domain ${document.location.hostname}`
      // });
      // console.log(this.state.notification);
      console.log(`wrong alias`);
      Meteor.logout();
      FlowRouter.go(signinRoute.path);
    }
  } else {
    console.log(`user not logged in: ${Meteor.user()}`);
    FlowRouter.go(signinRoute.path);
  }
  return {
    isLoading: (Meteor.userId() & !sub.ready()),
    profiles: Profiles.find().fetch()[0]
  }
};

export default createContainer(meteorData, UserHomePage);