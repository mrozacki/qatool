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
    for(var field in errors){
    if(errors[field])
     throw new Meteor.Error('invalid-meeting', errors[field]);
    }
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
  else if (meeting.startTime<(new Date())) {
    errors.startTime = "Meeting cannot start in the past";
  }
  if (!meeting.endTime)
    errors.endTime = "Please provide meeting end time";
  else if (meeting.endTime<meeting.startTime) {
    errors.endTime = "Meeting cannot end before it started";
  }
  if (!meeting.meetingCode)
  errors.meetingCode = "This meeting code has already been used. Please provide a unique one";
  else if(meeting.meetingCode.length!=6)
  errors.meetingCode = "Your meeting code should have 6 characters";
  else{
    if (Meetings.findOne({meetingCode:meeting.meetingCode})){
      errors.meetingCode = "This meeting code is already in use. Please provide a new one";
    }}

    return errors;
  };
