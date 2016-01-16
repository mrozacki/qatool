Template.questionForm.events({
  "submit form": function(event){
     event.preventDefault();

     var question = {
       meeting_id: this._id,
       text: $(event.target).find("[name=question]").val()
     };

     Questions.insert(question);
     $(event.target)[0].reset();
  }
});
