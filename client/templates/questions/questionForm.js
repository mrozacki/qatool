Template.questionForm.events({
  "submit form": function(event){
     event.preventDefault();

     var question = {
       meetingId: this._id,
       text: $(event.target).find("[name=question]").val()
     };
     Meteor.call('questionInsert', question, function(error, result) {
       // display the error to the user and abort
       if (error)
         return alert(error.reason);
       $(event.target)[0].reset();
     });
  }
});
