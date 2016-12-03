import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

// functions
import {aliasValidator} from '/imports/utils/index';

// const
import * as ERROR_CODE from '/imports/utils/error_code';
import {USER_ROLES} from './index';

/**
 * Function format characters for alias
 * @param rawKeyword
 * @return {*}
 */
export const formatAlias = (rawAlias) => {
  let alias = "";
  for(let i = 0, max = rawAlias.length; i < max; i++) {
    if(aliasValidator(rawAlias[i])) {
      alias += rawAlias[i].toLowerCase();
    }
  }
  return alias;
};

/**
 * Function check user is inactive or not
 * @param userId
 * @return {*|Boolean}
 */
export const isInactiveUser = ({userId}) => {
  return Roles.userIsInRole(userId, USER_ROLES.INACTIVE);
};