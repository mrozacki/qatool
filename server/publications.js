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
