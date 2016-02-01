Template.meetingItem.helpers({
  owner: function(){
    return Meteor.userId() && Meteor.userId()===this.ownerId;
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
