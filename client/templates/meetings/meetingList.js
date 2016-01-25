Template.meetingList.helpers({
  meetings: function(){
    return Meetings.find({},  {sort:{submitted:-1}, reactive:true});
  }
});
