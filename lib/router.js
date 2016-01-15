Router.configure({
  layoutTemplate: 'layout'//,
//  loadingTemplate: 'loading',
//  notFoundTemplate: 'notFound',
  //waitOn: function() {return Meteor.subscribe("meetings");}
});
Router.route('/',{name: 'meetingList'});
Router.route("/meeting/:_id", {
  name: "meetingQuestions",
  data: function(){return Meetings.findOne(this.params._id);
  }
});

Router.route('/newMeeting', {name: 'newMeeting'});
