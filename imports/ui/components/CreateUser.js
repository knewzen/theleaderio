import React, { Component } from 'react';

export default class CreateUser extends Component {

  _onSubmit() {
    const userProfile = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    // console.log(userProfile);
    this.props.onSubmit(userProfile);
  }

  render() {

    this.propTypes = {
      onSubmit: React.PropTypes.func
    };

    return (
      <div className="middle-box text-center loginscreen   animated fadeInDown">
        <div>
          <div>

            <h1 className="logo-name">TL+</h1>

          </div>
          <h3>Being a true leader doesn’t come from a title, it is a designation you must earn from the people you lead.</h3>
          <p>Become a good leader from today.</p>
          <form className="m-t" role="form" onSubmit={(event) => {
            event.preventDefault();
            this._onSubmit();
          }}>
            <div>

              <div className="form-group">
                <input ref="firstName" type="text" className="form-control" placeholder="First name" required="" />
              </div>
              <div className="form-group">
                <input ref="lastName" type="text" className="form-control" placeholder="Last name" required="" />
              </div>
              <div className="form-group">
                <input ref="email" type="email" className="form-control" placeholder="Email address" required="" />
              </div>
              <div className="form-group">
                <input ref="password" type="password" className="form-control" placeholder="Password" required="" />
              </div>
              <button type="submit" className="btn btn-primary block full-width m-b">Sign up</button>

            </div>
            <p className="text-muted text-center">
              <small>You are a leader already? </small>
              <a href="/signin">Sign in.</a>
            </p>
          </form>
          <p className="m-t text-center">
            <small>theLeader.io, strive for great leadership &copy; 2016</small>
          </p>
        </div>
      </div>
    );
  }
}