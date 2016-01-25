Template.home.events({
  'submit form': function(event){
    event.preventDefault();
     var meetingCode = $(event.target).find("[name=meetingCode]").val();

    Meteor.call('getMeetingId', meetingCode, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);
      Router.go('meetingQuestions', {_id: result._id});
    });
  }
});
