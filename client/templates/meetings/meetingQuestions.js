Template.meetingQuestions.helpers({
  questions: function(){
    return Questions.find({meetingId: this._id});
  }
});
