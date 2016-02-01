Template.questionForm.onCreated(function(){
  Session.set('newQuestionErrors', {});
});


Template.questionForm.events({
  "submit form": function(event){
     event.preventDefault();

     var question = {
       meetingId: this._id,
       text: $(event.target).find("[name=question]").val()
     };
     Session.set('newQuestionErrors', {});
     var errors = validateQuestion(question);
     for(var field in errors){
         if(errors[field])
           return Session.set('newQuestionErrors', errors);
     }

     Meteor.call('questionInsert', question, function(error, result) {
       // display the error to the user and abort
       if (error)
         return throwError(error.reason);
       $(event.target)[0].reset();
     });
  }
});

Template.questionForm.helpers({
  errorMessage: function(field) {
    return Session.get('newQuestionErrors')[field];
  },
  errorClass: function(field){
    return !!Session.get('newQuestionErrors')[field] ? 'has-error' : '';
  }
});
