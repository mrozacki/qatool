if (Meetings.find().count() === 0) {
  Meetings.insert({
    name: 'Narada u Zenka'
  });

  Meetings.insert({
    name: 'Wielka Zmiana'
  });

  Meetings.insert({
    name: 'I co dalej?'
  });
}


if (Questions.find().count() === 0) {
  Questions.insert({
    text: 'To co dalej robimy?',
    meeting_id: Meetings.findOne({name:'Narada u Zenka'})._id
  });

  Questions.insert({
    text: 'Jak zyc??',
    meeting_id: Meetings.findOne({name:'Narada u Zenka'})._id
  });

  Questions.insert({
    text: 'Ile to bedzie kosztowalo?',
    meeting_id: Meetings.findOne({name:'Narada u Zenka'})._id
  });
}
