Template.questionItem.helpers({
  notVoted: function(){
    var votedIds = Session.get("votedQuestions");
    if(!votedIds){
      votedIds = new Array();
      Session.set("votedQuestions", votedIds);
      return true;
    }
    else {
      for(var i = 0; i<votedIds.length; i++)
      {
        if (votedIds[i]===this._id)
        return false;
      }
      return true;
    }
  },
  owner: function(){
    if(Meteor.userId()===Meetings.findOne({_id: this.meetingId}).ownerId)
      return true;
    else {
      return false;
    }
  }
});

Template.questionItem.events({
  "click .btn-vote": function(event){
    event.preventDefault();
    var votedIds = Session.get("votedQuestions");
    Meteor.call('vote', this._id, function(error, result) {
      // display the error to the user and abort
      if (error)
       return  throwError(error.reason);
    });
    votedIds.push(this._id);
    return Session.set("votedQuestions", votedIds);
  },

  "click .btn-unvote": function(event){
    event.preventDefault();
    var votedIds = Session.get("votedQuestions");
    Meteor.call('unvote', this._id, function(error, result) {
      // display the error to the user and abort
      if (error)
       return  throwError(error.reason);
    });
    //votedIds.push(this._id);
    
    // remove from array votedIds the element with id equal to this._id 
    for(var i = votedIds.length - 1; i >= 0; i--) {  
      if(votedIds[i] === this._id) {
         votedIds.splice(i, 1);
      }
    }
    
    return Session.set("votedQuestions", votedIds);
  },

  "click .btn-answered": function(event){
    event.preventDefault();
    Meteor.call('answer', this._id, function(error, result) {
      // display the error to the user and abort
      if (error)
       return  throwError(error.reason);
    });
  }
});
