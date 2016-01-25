Questions = new Mongo.Collection('questions');

Questions.allow({
  insert: function(){
    return true;
  }, 
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});



Meteor.methods({
  questionInsert: function(questionAttributes){
    //validate input
    check(questionAttributes, {
      text: String,
      meetingId: String
    });

    var errors = validateMeeting(questionAttributes);
    if(errors.text)
    throw new Meteor.Error('invalid-question', "Your question needs to have some text");

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
  }
});

validateQuestion = function(meeting) {
  var errors={};

  //fill in an object with error messages by field
  if (!question.text)
  errors.name = "Please fill questions text";

  return errors;
  };
