import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import moment from 'moment';

// collections
import {Accounts} from 'meteor/accounts-base';
import {Profiles} from '/imports/api/profiles/index';
import {Employees, STATUS_ACTIVE} from '/imports/api/employees/index';

// cache
import {MiniMongo} from '/imports/api/cache/index';

// components
import Spinner from '/imports/ui/common/Spinner';
import UsersTable from '/imports/ui/containers/admin/UsersTable';
import DatePicker from '/imports/ui/components/DatePicker';

// const
import {USER_ROLES} from '/imports/api/users/index';

class ManageUsers extends Component {

  constructor() {
    super();

    this.state = {
      reloadData: false,
      users: [],
      noOfSearchResults: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const {ready, users, profiles} = nextProps;
    if (!_.isEmpty(users) && ready) {
      MiniMongo.remove({});
      users.map(user => {
        const
          {_id, emails, username, createdAt} = user,
          [userEmail] = emails,
          {address: email} = userEmail
          ;
        let
          profile = {},
          noOfActiveEmployees,
          doc = {}
          ;

        status = Roles.userIsInRole(user._id, USER_ROLES.INACTIVE) ? USER_ROLES.INACTIVE : USER_ROLES.ACTIVE;

        profile = Profiles.findOne({userId: user._id});

        noOfActiveEmployees = Employees.find({leaderId: user._id, status: STATUS_ACTIVE}).count();

        if (!_.isEmpty(profile)) {
          const {firstName, lastName, timezone} = profile;
          doc = {
            ...doc,
            firstName,
            lastName,
            timezone,
            noOfActiveEmployees
          };
        }

        doc = {
          ...doc,
          _id,
          email,
          username,
          status,
          createdAt
        };

        MiniMongo.insert(doc);
      });

      this.setState({
        users: MiniMongo.find().fetch(),
        noOfSearchResults: MiniMongo.find().count()
      });
    }
  }

  /**
   * @event
   * on form field change
   * @param  {string} field
   * @param  {string} value
   */
  _onChangeTimeRange = (field, value) => {
    const
      oldTimeRange = Session.get('userCreatedAtRange'),
      newTimeRange = {...oldTimeRange, [field]: value},
      {reloadData} = this.state
      ;

    Session.set('userCreatedAtRange', newTimeRange);
    // this.setState({
    //   reloadData: !reloadData
    // });
  };

  _onSearch() {
    const
      regExp = {$regex: new RegExp(this.refs.searchText.value)},
      query = {
        $or: [
          {email: regExp},
          {username: regExp},
          {firstName: regExp},
          {lastName: regExp},
          {timezone: regExp},
          {status: regExp}
        ]
      }
      ;

    this.setState({
      users: MiniMongo.find(query).fetch(),
      noOfSearchResults: MiniMongo.find(query).count()
    });
  }

  render() {
    const
      {ready, minCreatedAt, maxCreatedAt} = this.props,
      {users, noOfSearchResults} = this.state
      ;

    console.log(users.length);

    if (ready) {
      return (
        <div>
          <div className="row">
            <div className="search-form col-md-6" style={{marginTop: 20, paddingTop: 5}}>
              <form onSubmit={(event) => {
                      event.preventDefault();
                      this._onSearch.bind(this)();
                    }}
                    onKeyUp={(event) => {
                      event.preventDefault();
                      this._onSearch.bind(this)();
                    }}
              >
                <div className="input-group">
                  <input ref="searchText" type="text"
                         placeholder="email, name, or alias, ..." name="search"
                         className="form-control input-md"/>
                  <div className="input-group-btn">
                    <button className="btn btn-md btn-primary" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <DatePicker
                label="Created From:"
                option={{ startView: 2, todayBtn: "linked", keyboardNavigation: false, forceParse: false, autoclose: true }}
                isDateObject={true}
                value={minCreatedAt}
                error={""}
                disabled={false}
                onChange={value => this._onChangeTimeRange('from', value)}
              />
            </div>
            <div className="col-md-3">
              <DatePicker
                label="To:"
                option={{ startView: 2, todayBtn: "linked", keyboardNavigation: false, forceParse: false, autoclose: true }}
                isDateObject={true}
                value={maxCreatedAt}
                error={""}
                disabled={false}
                onChange={value => this._onChangeTimeRange('to', value)}
              />
            </div>
          </div>
          <h3>There are {noOfSearchResults} users found.</h3>
          <div className="hr-line-dashed"></div>
          <div className="row">
            <div className="search-result">
              <UsersTable
                users={users}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Spinner/>
      );
    }
  }
}

export default ManageUsersContainer = createContainer((params) => {
  const
    date = new Date(),
    subUsers = Meteor.subscribe('statistic.users'),
    subProfiles = Meteor.subscribe('statistic.profiles'),
    subEmployees = Meteor.subscribe("statistic.employees"),
    userCreatedAtRange = Session.get('userCreatedAtRange')
    ;
  let
    profiles = [],
    profilesReady = false,
    fromDate = new Date(moment(date).subtract(30, 'days')),
    toDate = date,
    query = {username: {$exists: true}},
    options = {sort: {createdAt: -1}},
    users = [],
    employees = [],
    employeesReady = false,
    totalUsers = 0
    ;

  if (!_.isEmpty(userCreatedAtRange)) {
    fromDate = userCreatedAtRange.from;
    toDate = userCreatedAtRange.to;
  } else {
    Session.set('userCreatedAtRange', {from: fromDate, to: toDate});
  }

  query.createdAt = {$gte: fromDate, $lte: toDate};
  users = Accounts.users.find(query, options).fetch();
  totalUsers = users.length;

  if (!_.isEmpty(users) && subProfiles.ready()) {
    let userIdList = [];

    users.map(user => {
      userIdList.push(user._id);
    });
    if (!_.isEmpty(userIdList)) {
      if(subProfiles.ready()) {
        profiles = Profiles.find({userId: {$in: userIdList}}).fetch();
      }
      if(subEmployees.ready()) {
        employees = Employees.find({leaderId: {$in: userIdList}}).fetch();
      }
    }
  }

  return {
    ready: subUsers.ready() & subEmployees.ready() & subProfiles.ready(),
    users,
    profiles,
    employees,
    minCreatedAt: fromDate,
    maxCreatedAt: toDate
  };
}, ManageUsers);