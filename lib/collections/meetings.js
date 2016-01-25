Meetings = new Mongo.Collection('meetings');

Meteor.methods({
  meetingInsert: function(meetingAttributes){
    //validate input
    check(Meteor.userId(), String);
    check(meetingAttributes, {
      name: String,
      startTime: Date,
      endTime: Date,
      meetingCode: String
    });

    var errors = validateMeeting(meetingAttributes);
    if(errors.name || errors.startTime || errors.endTime || errors.meetingCode)
    throw new Meteor.Error('invalid-meeting', "You must set a name, start, end times and a unique code for your meeting");

    var user = Meteor.user();
    var meeting = _.extend(meetingAttributes, {
      ownerId: user._id,
      created: new Date(),
      questionsCount: 0
    });
    var meetingId = Meetings.insert(meeting);
    return {
      _id: meetingId
    };
  }
});


validateMeeting = function(meeting) {
  var errors={};

  //fill in an object with error messages by field
  if (!meeting.name)
  errors.name = "Please fill in a meeting name";
  if (!meeting.startTime)
  errors.startTime = "Please provide meeting start time";
  if (!meeting.endTime)
  errors.endTime = "Please provide meeting end time";
  if (!meeting.meetingCode)
  errors.meetingCode = "Please provide a unique meeting code";
  else{
    if (Meetings.findOne({meetingCode:meeting.meetingCode})){
      errors.meetingCode = "This meeting code is already in use. Please provide a new one";
    }}

    return errors;
  };
