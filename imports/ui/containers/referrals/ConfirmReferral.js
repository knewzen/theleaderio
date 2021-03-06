import React, {Component} from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

// collections
import {Referrals} from '/imports/api/referrals/index';

// components
import AliasForm from '/imports/ui/components/AliasForm';
import Copyright from '/imports/ui/common/Copyright';
import NoticeForm from '/imports/ui/common/NoticeForm';

// methods
import * as UserActions from '/imports/api/users/methods';
import {addSubdomain} from '/imports/utils/subdomain';
import * as TokenActions from '/imports/api/tokens/methods';
import { createForMigration as createScheduler } from '/imports/api/scheduler/methods';
import {setStatus} from '/imports/api/referrals/methods';
import {confirm as confirmEmail} from '/imports/api/users/methods';

// constants
import {DOMAIN} from '/imports/startup/client/routes';
import { DEFAULT_SCHEDULER } from '/imports/utils/defaults';
import {STATUS} from '/imports/api/referrals/index';

// utils
import {aliasValidator, googleTrackConversion} from '/imports/utils/index';

export default class ConfirmReferral extends Component {
  constructor() {
    super();

    this.state = {
      aliasAllowed: null,
      errors: null,
      tokenId: "",
      tokenVerified: null,
      email: "",
    };
  }

  componentWillMount() {
    const tokenId = FlowRouter.getQueryParam("token");
    TokenActions.verify.call({tokenId, action: 'referral'}, (error, email) => {
      if (_.isEmpty(error)) {
        this.setState({
          tokenId,
          tokenVerified: true,
          email
        });
      } else {
        this.setState({
          errors: error.reason,
          tokenVerified: false
        });
      }
    });
    if (tokenId) {
      // call verify Token
      this.setState({
        tokenVerified: true
      });
    } else {
      this.setState({
        tokenVerified: false
      });
    }
  }

  _inputSubmit({inputValue}) {
    const
      alias = inputValue,
      _id = FlowRouter.getQueryParam("_id"),
      {email, tokenId} = this.state
      ;
    if(!_.isEmpty(email)) {
      // Call methods createAlias
      UserActions.createAlias.call({email, alias}, (error, userId) => {
        if (_.isEmpty(error)) {
          const referral = Referrals.findOne({email});
          // create default user scheduler
          DEFAULT_SCHEDULER.map(scheduler => {
            const year = moment().year();
            const {quarter, metrics} = scheduler;
            createScheduler.call({userId, year, quarter, metrics});
          });

          // confirm the referral
          setStatus.call({params: {_id, status: STATUS.CONFIRMED}}, (error) => {
            if(!error) {
              // verify email address
              confirmEmail.call({tokenId});

              // Remove token
              // console.log(tokenId)
              TokenActions.remove.call({tokenId, action: 'referral'}, (error, result) => {
                if(!error) {
                  // create token to set password
                  const newTokenId = TokenActions.generate.call({email, action: 'password'}, (error) => {
                    if(!error) {
                      // google conversion tracking
                      googleTrackConversion();

                      // Redirect to set password page
                      // Need the cookie sharing login information here
                      this.setState({
                        errors: null
                      });
                      // Sign out user before route to subdomain
                      addSubdomain({alias, route: FlowRouter.path('passwordPage', {action: 'set'}, {token: newTokenId})});
                    } else {
                      this.setState({
                        errors: error.reason
                      });
                    }
                  });
                } else {
                  this.setState({
                    errors: error.reason
                  });
                }
              });
            } else {
              this.setState({
                errors: error.reason
              });
            }
          });

        } else {
          this.setState({
            errors: error.reason
          });
        }
      });
    } else {
      this.setState({
        errors: "User not found"
      });
    }


  }

  _onKeyUp({inputValue}) {
    this.setState({
      aliasAllowed: false,
      errors: null
    });
    if (inputValue.length > 0) {
      if(aliasValidator(inputValue)) {
        UserActions.verify.call({alias: inputValue}, (error) => {
          if (!_.isEmpty(error)) {
            this.setState({
              aliasAllowed: true,
              errors: null
            });
          } else {
            this.setState({
              aliasAllowed: false,
              errors: `${inputValue}.${DOMAIN} is already taken. Please choose another one ...`
            });
          }
        });
      } else {
        this.setState({
          aliasAllowed: false,
          errors: "Please use only letters (a-z), numbers."
        });
      }
    }
  }

  render() {
    const {tokenVerified, aliasAllowed, errors} = this.state;
    if (this.state.tokenVerified) {
      return (
        <div className="middle-box text-center loginscreen   animated fadeInDown">
          <div>
            <h1 className="logo-name">TL+</h1>
          </div>
          <h3>Create your alias</h3>
          <p>This alias will be used as your web address.</p>
          <AliasForm
            inputType='text'
            inputHolder='alias'
            buttonLabel='Create'
            aliasAllowed={aliasAllowed}
            errors={ errors }
            onSubmit={ this._inputSubmit.bind(this) }
            onKeyUp={ _.debounce(this._onKeyUp.bind(this), 300) }
          />
          <Copyright />
        </div>
      );
    } else {
      return (
        <div id="page-top">
          <NoticeForm
            code='404'
            message={ errors }
            description='Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.'
            buttonLabel='Come back to HomePage'
            redirectUrl='/'
          />
        </div>
      );
    }
  }
}