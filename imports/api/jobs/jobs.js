import {Meteor} from 'meteor/meteor';
import {later} from 'meteor/mrt:later';

// Job Collections
import {DailyJobs, QueueJobs} from './collections';

// functions
import {getLocalDate} from '/imports/api/time/functions';

// constants
import * as ERROR_CODE from '/imports/utils/error_code';

function createJob(type, attributes, data) {
  if (Meteor.isServer) {
    let job;
    switch(type) {
      case "enqueue_surveys": {
        job = new Job(DailyJobs, type, data);
        break;
      }
      case "send_surveys": {
        job = new Job(QueueJobs, type, data);
        break;
      }
    }
    const currentDate = new Date();
    const {
      depends = [],
      priority = "",
      retry = {},
      repeat = {},
      delay = 0,
      after = currentDate
    } = attributes;

    if (!_.isEmpty(depends)) {
      job.depends(depends);
    }
    if (priority !== "") {
      job.priority(priority);
    }
    if (!_.isEmpty(retry)) {
      job.retry(retry);
    }
    if (!_.isEmpty(repeat)) {
      job.repeat(repeat);
    }
    if (delay > 0) {
      job.delay(delay);
    }
    if (after - currentDate > 0) {
      job.after(after);
    }
    return job.save();
  } else {
    return ERROR_CODE.PERMISSION_DENIED;
  }
}

function removeJob() {

}

function pauseJob() {

}

export const Jobs = {
  create: createJob,
  remove: removeJob
};