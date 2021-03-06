import React, {Component} from 'react';

import {DOMAIN} from '/imports/startup/client/routes';

import CheckBox from '/imports/ui/components/CheckBox1';

export default class SignInForm extends Component {

  constructor() {
    super();

    this.state = {
      showPassword: false
    };
  }

  _onSubmit() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.onSubmit({email, password});
  }

  render() {
    const
      {showPassword} = this.state,
      {
        signinTitle = `Welcome to theLeader.io`,
        errors = null
      } = this.props,
      forgotPasswordUrl = FlowRouter.path('passwordPage', {action: 'forgot'}),
      signUpUrl = `http://${DOMAIN}${FlowRouter.path('newSignUpSteps', {action: 'alias'})}`
      ;
    return (

      <form className="m-t" role="form" onSubmit={(event) => {
                      event.preventDefault();
                      this._onSubmit();
                    }}>
        <div className="form-group">
          <input ref="email" type="email" className="form-control" placeholder="Email address" required autoFocus/>
        </div>
        <div className="form-group">
          <input ref="password" className="form-control" placeholder="Password" required={true}
                 type={showPassword ? "text" : "password"}
          />
        </div>
        <div className="form-group">
          <CheckBox
            label=" show password"
            checked={showPassword}
            onChange={value => this.setState({ showPassword: value })}
          />
        </div>
        <div className="form-group">
          {!_.isEmpty(errors) && (
            <p className="alert-danger text-center">{errors}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary block full-width m-b">Sign in</button>

        <a href={forgotPasswordUrl}>
          <small>Forgot password?</small>
        </a>

        <p className="text-muted text-center">
          <small>Do not have an account?</small>
        </p>
        <a className="btn btn-sm btn-white btn-block" href={signUpUrl}>Create an account</a>
      </form>

    );
  }
}
