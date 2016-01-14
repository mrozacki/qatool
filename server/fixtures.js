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
