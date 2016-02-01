Template.updateMeeting.onCreated(function(){
  Session.set('updateMeetingErrors', {});
});

Template.updateMeeting.events({
  "submit form": function(event){
    event.preventDefault();

    var meeting = {
      _id: this._id,
      name: $(event.target).find("[name=name]").val(),
      startTime: new Date($(event.target).find("[name=startTime]").val()),
      endTime: new Date($(event.target).find("[name=endTime]").val()),
      meetingCode: $(event.target).find("[name=meetingCode]").val().toLowerCase()
    };
    var errors = validateMeeting(meeting);
    for(var field in errors){
        if(errors[field])
          return Session.set('updateMeetingErrors', errors);
    }

    Meteor.call('meetingInsert', meeting, function(error, result) {
      // display the error to the user and abort
      if (error)
       return  throwError(error.reason);
      Router.go('meetingQuestions', {_id: result._id});
    });
  },
    "input #startTime": function(event) {
      var endTime = moment($(event.target).val());
      endTime.add(1,'h');
      $('#endTime').val(endTime.format('YYYY-MM-DDTHH:mm'));
    }
});

Template.updateMeeting.helpers({
  errorMessage: function(field) {
    return Session.get('updateMeetingErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('updateMeetingErrors')[field] ? 'has-error' : '';
  }
});
