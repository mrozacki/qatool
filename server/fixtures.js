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
    meetingCode: "NRDznk"
  });

  Meetings.insert({
    name: 'Wielka Zmiana',
    ownerId: tomId,
    startTime: new Date(now + 9 * 3600 * 1000),
    endTime: new Date(now + 9 * 3600 * 1000 + 3600 * 1000),
    meetingCode: "WlkZM"
  });

  Meetings.insert({
    name: 'I co dalej?',
    ownerId: sachaId,
    startTime: new Date(now + 3 * 3600 * 1000),
    endTime: new Date(now + 3 * 3600 * 1000 + 1800 * 1000),
    meetingCode: "IcDLj"
  });
}

//add questions
if (Questions.find().count() === 0) {
  Questions.insert({
    text: 'To co dalej robimy?',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id
  });

  Questions.insert({
    text: 'Jak zyc??',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id
  });

  Questions.insert({
    text: 'Ile to bedzie kosztowalo?',
    meetingId: Meetings.findOne({name:'Narada u Zenka'})._id
  });
}
