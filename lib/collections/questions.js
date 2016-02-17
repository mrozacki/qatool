Questions = new Mongo.Collection('questions');

Meteor.methods({   // server methods 
  questionInsert: function(questionAttributes){
    //validate input
    check(questionAttributes, {
      text: String,
      meetingId: String
    });

    var errors = validateQuestion(questionAttributes);
    if(errors.text)
    throw new Meteor.Error('invalid-question', "Your question needs to have some text");
    if(errors.sameQuestion)
    throw new Meteor.Error('existing-question', "Such question has already been posted");
    var question = _.extend(questionAttributes, {
      votes: 0,
      answered: false,
      created: new Date()
    });
    var questionId = Questions.insert(question);
    Meetings.update({_id: questionAttributes.meetingId},
      {$inc: {questionsCount: 1}});
      return {
        _id: questionId
      };
    },
    vote: function(questionId){
      check(questionId, String);
      Questions.update({_id:questionId}, {$inc:{votes: 1}});
    },
    answer: function(questionId){
      check(questionId, String);
      check(Meteor.userId(), String);
      var question = Questions.findOne({_id: questionId});
      var meeting = Meetings.findOne({_id:question.meetingId});
      if(Meteor.userId()!=meeting.ownerId)
      throw new Meteor.Error('invalid-owner', "You are not the owner of this meeting");
      var newValue = question.answered ? false : true;
      Questions.update({_id:questionId},{$set: {answered:newValue }});
      return {
        _id: questionId
      };
    }
  });

  validateQuestion = function(question) {
    var errors={};
    //fill in an object with error messages by field
    if (!question.text || question.text==="")
      errors.text = "Please fill questions text";
    else if(Questions.findOne({text: question.text, meetingId: question.meetingId})){
      errors.text = "This question has already been posted";}

    return errors;
  };
