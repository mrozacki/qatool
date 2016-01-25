if (Meetings.find().count() === 0) {
  //check current time
  var now = new Date().getTime();

  //create 2 users for testing
  var tomId = Accounts.createUser({
    username: "tom",
    email: "tom@example.com",
    password: "password",
    profile: { name: 'Tom Interesting' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Accounts.createUser({
    username: "sacha",
    email: "sacha@example.com",
    password: "password",
    profile: { name: 'Sacha Funny' }
  });
  var sacha = Meteor.users.findOne(sachaId);


//create meetings
  Meetings.insert({
    name: 'Narada u Zenka',
    ownerId: tomId,
    startTime: new Date(now + 7 * 3600 * 1000),
    endTime: new Date(now + 7 * 3600 * 1000 + 3600 * 1000),
    meetingCode: "NRDznk",
    submitted: now,
    questionsCount: 3
  });

  Meetings.insert({
    name: 'Wielka Zmiana',
    ownerId: tomId,
    startTime: new Date(now + 9 * 3600 * 1000),
    endTime: new Date(now + 9 * 3600 * 1000 + 3600 * 1000),
    meetingCode: "WlkZM",
    submitted: now,
    questionsCount: 0
  });

  Meetings.insert({
    name: 'I co dalej?',
    ownerId: sachaId,
    startTime: new Date(now + 3 * 3600 * 1000),
    endTime: new Date(now + 3 * 3600 * 1000 + 1800 * 1000),
    meetingCode: "IcDLj",
    submitted: now,
    questionsCount: 0
  });


//add questions
  Questions.insert({
    text: 'To co dalej robimy?',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id,
    votes: 0,
    answered: false,
    created: now
  });

  Questions.insert({
    text: 'Jak zyc??',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id,
    votes: 0,
    answered: false,
    created: now
  });

  Questions.insert({
    text: 'Ile to bedzie kosztowalo?',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id,
    votes: 0,
    answered: false,
    created: now
  });
}
