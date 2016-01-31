Template.newMeeting.onCreated(function(){
  Session.set('newMeetingErrors', {});
});

Template.newMeeting.events({
  "submit form": function(event){
    event.preventDefault();

    var meeting = {
      name: $(event.target).find("[name=name]").val(),
      startTime: new Date($(event.target).find("[name=startTime]").val()),
      endTime: new Date($(event.target).find("[name=endTime]").val()),
      meetingCode: $(event.target).find("[name=meetingCode]").val()
    };

    var errors = validateMeeting(meeting);
    for(var field in errors){
        if(errors[field])
          return Session.set('newMeetingErrors', errors);
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

Template.newMeeting.helpers({
  now: function(){
    var defaultTime = moment(new Date());
    defaultTime.startOf('hour');
    defaultTime.add(1,'h');
    return defaultTime.format('YYYY-MM-DDTHH:mm');
  },
  errorMessage: function(field) {
    return Session.get('newMeetingErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('newMeetingErrors')[field] ? 'has-error' : '';
  }
});
