Meetings = new Mongo.Collection('meetings');

Meteor.methods({
  meetingInsert: function(meetingAttributes){
    //validate input
    check(Meteor.userId(), String);
    check(meetingAttributes, {
      _id: Match.Optional(String),
      name: String,
      startTime: Date,
      endTime: Date,
      meetingCode: String
    });

    meetingAttributes.meetingCode = meetingAttributes.meetingCode.toLowerCase();
    var errors = validateMeeting(meetingAttributes);
    for(var field in errors){
      if(errors[field])
        throw new Meteor.Error('invalid-meeting', errors[field]);
    }
    var user = Meteor.user();
    var meeting = _.extend(meetingAttributes, {
      ownerId: user._id,
      submitted: meetingAttributes._id ? Meetings.findOne({_id:meetingAttributes._id}).submitted : new Date(),
      lastUpdate: new Date(),
      questionsCount: meetingAttributes._id ? Questions.find({meetingId: meetingAttributes._id}).count() : 0
    });
    var meetingId;
    if(!meeting._id){
      meetingId = Meetings.insert(meeting);
    }
    else {
      var thisMeeting = Meetings.findOne({_id :meeting._id});
      meetingId=meeting._id;
      if(thisMeeting.ownerId===meeting.ownerId){
        Meetings.update({_id:meetingId},meeting);
      }
      else {
        throw new Meteor.Error('Invalid-user', "only a meeting's owner can update it");
      }

    }

    return {
      _id: meetingId
    };
  },
  cancelMeeting: function(meetingId){
    check(meetingId, String);
    var meeting=Meetings.findOne({_id:meetingId});
    if(!Meteor.userId() || meeting.ownerId!=Meteor.userId()) {
      throw new Meteor.Error('Invalid-user', "only a meeting's owner can cancel it");
    }
    else {
      Questions.remove({meetingId: meetingId});
      return Meetings.remove({_id:meetingId});
    }
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
  errors.meetingCode = "Please provide a meeting id";
  else if(meeting.meetingCode.length!=6)
  errors.meetingCode = "Your meeting code should have 6 characters";
  else{
    var sameCodeMeeting = Meetings.findOne({meetingCode:meeting.meetingCode});

    if (sameCodeMeeting && meeting._id && sameCodeMeeting._id!=meeting._id){
      errors.meetingCode = "This meeting code is already in use. Please provide a new one";
    }}

    return errors;
  };
