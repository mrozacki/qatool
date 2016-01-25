Template.meetingQuestions.helpers({
  questions: function(){
    return Questions.find({meetingId: this._id, answered: false},
      {
        sort:{ votes:-1, submitted: - 1},
        reactive:true
      });
    }
  });
