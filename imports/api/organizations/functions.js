import {Meteor} from 'meteor/meteor';

// collections
import {Organizations} from '/imports/api/organizations/index';
import {Employees, STATUS_DEACTIVE, STATUS_ACTIVE} from '/imports/api/employees/index';

// functions
import {generateRandomCode} from '/imports/utils/index';

// constants
import * as ERROR_CODE from '/imports/utils/error_code';

/**
 * Function get 1 employee from organization randomly
 * @param leaderId
 * @param organizationId
 * @return employeeId
 */
export const getRandomEmployee = ({params}) => {
  if (Meteor.isServer) {
    const
      {organizationId} = params
      ;
    let
      end = false,
      employeeId = "", // current picked employee
      organization = {},
      employees = [],
      pickedEmployees = [],
      total = 0,
      picked = -1,
      currentPickedEmployeeId = "",
      currentPickedEmployee = {},
      currentOrganization = {}
      ;

    // if all employees had been picked, clear the list pickedEmployees
    organization = Organizations.findOne({_id: organizationId});
    employees = organization.employees;
    pickedEmployees = organization.pickedEmployees;

    if(typeof pickedEmployees === 'undefined') {
      Organizations.update({_id: organizationId}, {$set: {pickedEmployees: []}});
      organization = Organizations.findOne({_id: organizationId});
      employees = organization.employees;
      pickedEmployees = organization.pickedEmployees;
    }
    if (employees.length === pickedEmployees.length) {
      Organizations.update({_id: organizationId}, {$set: {pickedEmployees: []}});
    }
    end = false;
    do {
      organization = Organizations.findOne({_id: organizationId});
      if (!_.isEmpty(organization)) {
        employees = organization.employees;
        pickedEmployees = organization.pickedEmployees;
        total = employees.length;

        if(total > 0) {
          picked = Math.floor((Math.random() * total));
          currentPickedEmployeeId = employees[picked];

          if (_.indexOf(pickedEmployees, currentPickedEmployeeId) === -1) { // employee not picked yet
            currentPickedEmployee = Employees.findOne({_id: currentPickedEmployeeId});
            if (!_.isEmpty(currentPickedEmployee)) {
              // add currentPickedEmployee into pickedEmployees list
              Organizations.update({_id: organizationId}, {$addToSet: {pickedEmployees: currentPickedEmployeeId}});
              if (currentPickedEmployee.status === STATUS_ACTIVE) {
                end = true;
              } else {
                end = false;
              }
            } else {
              end = true;
              // console.log({message: `Employee ${currentPickedEmployeeId} not exists.`})
            }
          } else {
            end = false;
          }
        } else {
          return {message: `Organization ${organizationId} has no employee.`};
        }
      } else {
        return {message: ERROR_CODE.RESOURCE_NOT_FOUND}
      }
    } while (!end);

    return {employeeId: currentPickedEmployeeId};

  } else {
    return {message: ERROR_CODE.PERMISSION_DENIED}
  }
};

/**
 * Function add Random Code for organization
 * @param _id
 */
export const addRandomCode = function(_id) {
  let
    randomCode = "",
    codeAccepted = false
    ;
  do {
    randomCode = generateRandomCode(8);
    const noOfCodeExists = Organizations.find({randomCode}).count();
    codeAccepted = noOfCodeExists <= 0 ? true : false;
  } while(!codeAccepted)
  return Organizations.update({_id}, {$set: {randomCode}});
};

/**
 * Function get all present organizations of a leader
 * @param leaderId
 * @return {Array}
 */
export const getAllPresentOrganizationOfLeader = ({leaderId}) => {
  const
    selector = {leaderId, isPresent: true},
    modifier = {fields: {_id: true}},
    Orgs = Organizations.find(selector, modifier).fetch()
    ;
  let PresentOrgs = [];

  Orgs.map(Org => {
    const {_id} = Org;
    PresentOrgs.push(_id);
  });

  return PresentOrgs;
};