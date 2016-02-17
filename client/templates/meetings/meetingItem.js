Template.meetingItem.helpers({
  owner: function(){
    return Meteor.userId() && Meteor.userId()===this.ownerId;
  },
  
  extendedView: function() {
    // if(Iron.Location.get().path=='/mymeetings') { return true; }
    
    if(Router.current().route.getName()=='meetingList') { return true; }
    else { return false; } 
  }
});



Template.meetingItem.events({
  "click #cancelMeeting": function(event){
    event.preventDefault();
    Meteor.call('cancelMeeting', this._id, function(error, result) {
      // display the error to the user and abort
      if (error)
       return  throwError(error.reason);
      Router.go('meetingList');
    });
  }
});
