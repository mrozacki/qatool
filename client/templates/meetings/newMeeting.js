Template.newMeeting.events({
  "submit form": function(event){
     event.preventDefault();

     var meeting = {
       name: $(event.target).find("[name=name]").val()
     };

     var result=Meetings.insert(meeting);

     Router.go('meetingQuestions', {_id: result});
  }
});
