Meteor.publish("meetings", function(userId){
  check(userId, Match.OneOf(String, null));
  return Meetings.find({ownerId: userId}, {sort: {start_time: -1} });
});

Meteor.publish("questions", function(meetingId){
  check(meetingId, Match.Any);
  return Questions.find({meetingId: meetingId});
});

Meteor.publish("meeting", function(meetingId){
  check(meetingId, String);
  return Meetings.find({_id: meetingId});
});

Meteor.methods({
  getMeetingId: function(meetingCode){
    check(meetingCode, String);
    var meeting = Meetings.findOne({meetingCode: meetingCode});
    if(!meeting)
    throw new Meteor.Error('invalid-meeting', "Check your meeting code");
    var meetingId=meeting._id;
    var result = {_id: meetingId};
    return result;
  }
});
