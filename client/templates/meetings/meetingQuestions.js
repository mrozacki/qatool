Template.meetingQuestions.helpers({
  unansweredQuestions: function() {
    return Questions.find({
      meetingId: this._id,
      answered: false
    }, {
      sort: {
        votes: -1,
        submitted: -1
      },
      reactive: true
    });
  },
  answeredQuestions: function() {
    return Questions.find({
      meetingId: this._id,
      answered: true
    }, {
      sort: {
        votes: -1,
        submitted: -1
      },
      reactive: true
    });
  },
  displayAnswered: function() {
    var meeting = Meetings.findOne({
      _id: this._id
    });
    var question = Questions.findOne({
      meetingId: this._id,
      answered: true
    });
    if (!meeting || !question)
      return false;
    if (Meteor.userId() === meeting.ownerId) {
      return true;
    } else {
      return false;
    }
  }
});

Template.meetingQuestions.onRendered(function() {
    this.find('#unanswered')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .removeClass('animate')
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    moveElement: function(node, next) {
      var $node = $(node),
        $next = $(next);
      var oldTop = $node.offset().top;
      var height = $node.outerHeight(true);

      // find all the elements between next and node
      var $inBetween = $next.nextUntil(node);
      if ($inBetween.length === 0)
        $inBetween = $node.nextUntil(next);

      // now put node in place
      $node.insertBefore(next);

      // measure new top
      var newTop = $node.offset().top;

      // move node *back* to where it was before
      $node
        .removeClass('animate')
        .css('top', oldTop - newTop);

      // push every other element down (or up) to put them back
      $inBetween
        .removeClass('animate')
        .css('top', oldTop < newTop ? height : -1 * height);


      // force a redraw
      $node.offset();

      // reset everything to 0, animated
      $node.addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    },
    removeElement: function(node) {
      $(node)
        .removeClass('animate')
        .fadeOut(function() {
          $(this).remove();
        });
    }
  };
});
