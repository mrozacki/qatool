Template.meetingList.helpers({
  meetings: function(){
    return Meetings.find();
  }
});
