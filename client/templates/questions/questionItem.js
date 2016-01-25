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
  }
});

Template.questionItem.events({
  "click .btn-vote": function(event){
    event.preventDefault();
    var votedIds = Session.get("votedQuestions");
    Questions.update({_id:this._id}, {$inc:{votes: 1}});
    votedIds.push(this._id);
    return Session.set("votedQuestions", votedIds);
  },

  "click .btn-answered": function(event){
    event.preventDefault();
    return Questions.update({_id:this._id},{$set: {answered:true }});
  }
});
