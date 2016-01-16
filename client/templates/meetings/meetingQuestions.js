Template.meetingQuestions.helpers({
  questions: function(){
    return Questions.find({meeting_id: this._id});
  }
});
