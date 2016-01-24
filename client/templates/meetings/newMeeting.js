Template.newMeeting.events({
  "submit form": function(event){
     event.preventDefault();

     var meeting = {
       name: $(event.target).find("[name=name]").val(),
       ownerId: Meteor.userId(),
       startTime: $(event.target).find("[name=startTime]").val(),
       endTime: $(event.target).find("[name=endTime]").val(),
       meetingCode: $(event.target).find("[name=meetingCode]").val()
     };

     var result=Meetings.insert(meeting);

     Router.go('meetingQuestions', {_id: result});
  }
});

Template.newMeeting.helpers({
  now: function(){
    now = new Date().getTime();
    console.log(toString(now));
    return toString(now);
  }
});
