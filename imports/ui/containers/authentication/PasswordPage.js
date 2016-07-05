import React, { Component } from 'react';
import _ from 'lodash';

import SingleInputFrom from '/imports/ui/common/SingleInputForm';
import NoticeForm from '/imports/ui/common/NoticeForm';
import * as EmailActions from '/imports/api/email/methods';
import * as SubdomainActins from '/imports/utils/subdomain';
import * as TokenActions from '/imports/api/tokens/methods';
import Spinner from '/imports/ui/common/Spinner';

export default class PasswordPage extends Component {
  constructor() {
    super();

    this.state = {
      action: null,
      errors: null,
      loading: null
    };
  }

  componentWillMount() {
    const action = FlowRouter.getParam("action");
    this.setState({
      action: action
    });
  }

  _inputSubmit({ inputValue }) {
    const alias = SubdomainActins.getSubdomain();
    const domain = window.location.hostname;
    const email = inputValue;
    console.log(`alias: ${alias}, email: ${email}, errors: ${this.state.errors}`);
    this.setState({
      loading: true
    });
    const tokenId = TokenActions.generate.call({email}, (error) => {
      if (!error) {
        // call methods to send verify Email with token link to user
        // route to Welcome page with a message to verify user's email
        const url = `http://${document.location.hostname}:9000/password/reset?token=${tokenId}`;
        const mailOptions = {
          email: email,
          url: url,
          templateName: 'resetpassword'
        };
        EmailActions.send.call(mailOptions, (error) => {
          if (!_.isEmpty(error)) {
            this.setState({
              loading: false,
              errors: error.reason
            });
          } else {
            this.setState({
              loading: false,
              errors: null,
              action: 'sent'
            });
          }
        });
      }
    });
  }

  render() {
    const formTitle = `Password ${this.state.action}`;
    const formDescription = `Enter your email address you use to sign in to ${document.location.hostname}`;
    if(this.state.loading) {
      return (
        <div>
          <Spinner
            message = 'Sending email ...'
          />
        </div>
      );
    }
    if(this.state.action === 'forgot' | this.state.action === 'reset') {
      return (
        <div>
          <SingleInputFrom
            logoName = 'TL+'
            formTitle = { formTitle }
            formDescription = { formDescription }
            inputType = 'email'
            inputHolder = 'Email address'
            buttonLabel = 'Send reset link'
            errors = { this.state.errors }
            onSubmit = { this._inputSubmit.bind(this) }
          />
        </div>
      );
    } else if(this.state.action === 'sent') {
      return (
        <div>
          <NoticeForm
            code='TL+'
            message = 'Email sent'
            description = 'Please check your inbox for instructions from us on how to reset your password.'
            buttonLabel = 'Come back to HomePage'
            redirectUrl = '/'
          />
        </div>
      );
    } else {
      return (
        <div>
          <NoticeForm
            code='404'
            message={ this.state.errors }
            redirectUrl='/'
          />
        </div>
      );
    }
  }
}