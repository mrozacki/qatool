Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
  //waitOn: function() {return Meteor.subscribe("meetings");}
});
Router.route('/',{name: 'home'});
Router.route('/mymeetings',{
  name: 'meetingList',
  waitOn: function() {return Meteor.subscribe("meetings");}
});

Router.route('/updateMeeting/:_id',{
  name: 'updateMeeting',
  data: function(){return Meetings.findOne(this.params._id);},
  waitOn: function() {return Meteor.subscribe("meetings");}
});

Router.route("/meeting/:_id", {
  name: "meetingQuestions",
  data: function(){return Meetings.findOne(this.params._id);},
  waitOn: function() {return [
    Meteor.subscribe("questions", this.params._id),
    Meteor.subscribe("meeting", this.params._id)];}
  });

  Router.route('/newMeeting', {name: 'newMeeting'});

  var requireLogin = function () {
    if( ! Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render (this.loadingTemplate);
      }else{
        this.render('home');
      }
    } else {
      this.next();
    }
  };

  Router.onBeforeAction(requireLogin, {only: 'meetingList'});
  Router.onBeforeAction(requireLogin, {only: 'newMeeting'});
  Router.onBeforeAction(requireLogin, {only: 'updateMeeting'});
