Template.meetingQuestions.helpers({
  unansweredQuestions: function(){
    return Questions.find({meetingId: this._id, answered: false},
      {
        sort:{ votes:-1, submitted: - 1},
        reactive:true
      });
    },
    answeredQuestions: function(){
      return Questions.find({meetingId: this._id, answered: true},
        {
          sort:{ votes:-1, submitted: - 1},
          reactive:true
        });
      },
    displayAnswered: function(){
      var meeting = Meetings.findOne({_id: this._id});
      var question = Questions.findOne({meetingId: this._id, answered: true});
      if(!meeting || !question)
        return false;
      if(Meteor.userId()===meeting.ownerId){
        return true;
      }
      else {
        return false;
      }
    }
  });
