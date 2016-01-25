Template.newMeeting.events({
  "submit form": function(event){
    event.preventDefault();

    var meeting = {
      name: $(event.target).find("[name=name]").val(),
      startTime: new Date($(event.target).find("[name=startTime]").val()),
      endTime: new Date($(event.target).find("[name=endTime]").val()),
      meetingCode: $(event.target).find("[name=meetingCode]").val()
    };


    Meteor.call('meetingInsert', meeting, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('meetingQuestions', {_id: result._id});
    });

  }
});

Template.newMeeting.helpers({
  now: function(){
    now = new Date().getTime();
    console.log(toString(now));
    return toString(now);
  }
});
